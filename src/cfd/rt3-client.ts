import { BehaviorSubject, Observable } from "rxjs";
import { FancyTimer, fancyTimer } from "./fancy-timer";
import { ChannelState } from './public-types';
// ----------------------------------------
// This belongs in jrad-tools
// ----------------------------------------

const THIRTY_SEC = 1000 * 30;
const ONE_MIN = 1000 * 60;
const FIVE_MIN = ONE_MIN * 5;
const ONE_HOUR = ONE_MIN * 60;
const FIVE_HOURS = ONE_HOUR * 5;
const RECONNECT_IF_DISCONNECTED_AND_LAST_ACTION_WITHIN_X_MS = FIVE_HOURS;
const RECONNECT = false;
const MAX_RETRIES = 20;

interface IncomingMsg {
    readonly channelId:string;
    readonly payload:any;
}

export interface RTJoinReq<T=any> {
    readonly action:"JOIN_CHANNEL";
    readonly channelId:string;
    readonly params:T;
}

export interface RTLeaveReq<T=any> {
    readonly action:"LEAVE_CHANNEL";
    readonly channelId:string;
}

interface ChannelConfig<T=any> {
    readonly channelId:string;
    // readonly obs:Observable<any>;
    // This must change. we must wrap the state around something that gives us status.
    // readonly status:BehaviorSubject<ChannelStatus>; // OR we do something like this
    readonly state:BehaviorSubject<ChannelState<T>>;

    readonly params:any;
    readonly onMsg?:(x:any) => T|null|undefined;
}

export interface RTEvent<T=any> {
    readonly channelId:string;
    readonly params:T;
}

export type RTReq<T=any> = RTJoinReq<T> | RTLeaveReq<T>;

const END_STREAM_SYMBOL = Symbol("END_STREAM");
const COULD_NOT_JOIN = Symbol("COULD_NOT_JOIN");
const EXPIRED_SYMBOL = Symbol("EXPIRED");
const WS_CLOSED_SYMBOL = Symbol("WS_CLOSED");

const noop = () => {};


// const NO_MSG_YET_RECEIVED = Symbol("no-msg");
// interface IncomingToClientJeffsocketMsg {
//     readonly routeName:string;
//     readonly channelId:string;
//     readonly data:any;
// }
// interface IncomingToServerJeffsocketMsg {
//     readonly action:"JOIN"|"LEAVE";
//     readonly name:string;
//     readonly channelId?:string;
//     readonly params?:any;
// }
// const getId = (routeName:string, channelId?:string) => routeName + "/" + channelId ?? "*";
// const hours = (h:number) => h * 60 * 60 * 1000;

const minutes = (m:number) => m * 60 * 1000;
const seconds = (s:number) => s * 1000;

/** The maximum number of milliseconds to delay a reconnection attempt. */
const MAX_RECONNECT_INTERVAL_MS = seconds(30);
const RECONNECT_INTVERAL_MS = seconds(1);
const RECONNECT_DECAY = 1.5; // rate of increase of the reconnect delay
const GIVE_UP_RECONNECT_AFTER_MS = minutes(10);
const CLOSE_WS_IF_NOT_CONNECTED_AFTER_MS = seconds(2);
// const PING_INTERVAL_MS = seconds(30);
const CLOSE_IF_NO_DATA_RECEIVED_AFTER_MS = minutes(10); // was 1

type JeffSocketClientStatus =
    | "NOT_YET_LISTENING"
    | "GAVE_UP" // This is the only status which requires UI show button to reconnect.
    | "CONNECTED"
    | "CONNECTING"
    | "DISCONNECTED"; // this means we may try again

type CloseReason =
    | "UNKNOWN"
    | "NOTHING_TO_LISTEN_TO"
    | "DISPOSED"
    | "PONG_NOT_HEARD"
    | "INACTIVE"
    | "GAVE_UP_RECONNECTING"
    | "FAILED_TO_CONNECT_IN_TIME"

// interface RoutedChannelSubscription {
//     readonly routeName:string;
//     readonly channelId:string;
//     readonly params:any;
//     // readonly incoming$:Subject<any>;
//     readonly incoming$:BehaviorSubject<any>; // so we can get last value
// }




export const createRTClient = (url:string) => new RealTimerClient(url);

export class RealTimerClient {

    private channels = new Map<string, ChannelConfig>();
    private ws:WebSocket|null = null;
    private url:string;

    private status = new BehaviorSubject<JeffSocketClientStatus>("NOT_YET_LISTENING");
    public status$ = this.status.asObservable();

    private timerCountdowns = new BehaviorSubject<Record<string, number>>({});
    public timerCountdowns$ = this.timerCountdowns.asObservable();
    

    private pingTimer:FancyTimer;
    private reconnectTimer:FancyTimer;
    private inactivityTimer:FancyTimer;
    private closeOnNoPongTimer:FancyTimer;
    private failToOpenTimer:FancyTimer;

    private reconnectAttempts = 0;
    private beganReconnectingAt = 0;
    private closeReason:CloseReason = "UNKNOWN";
    public ignorePongs = false;

    
    private onWindowFocus = () => {
        // This cannot be a method or we lose "this" when adding as event listener.
        if (this.status.getValue() === "DISCONNECTED" && this.channels.size > 0) {
            console.log("window focus, disconnected, reconnect immediately");
            this.createNewWebSocket();
        } else if (this.status.getValue() === "CONNECTED") {
            console.log("window focus, ping immediately");
            this.pingTimer.stop();
            this.ping();
        } else {
            console.log("window focus, do nothing");
        }
    }

    constructor(url:string) {
        this.url = url;

        window.addEventListener("focus", this.onWindowFocus);

        // None of these timers are active until we start them.
        this.pingTimer = fancyTimer("ping", () => this.ping(), seconds(30)); // was 30
        this.reconnectTimer = fancyTimer("reconnect", () => {
            console.log("attempt reconnect! total attempts so far:", this.reconnectAttempts);
            this.reconnectAttempts++;
            this.createNewWebSocket();
        })
        this.inactivityTimer = fancyTimer("inactivity", () => {
            console.log("INACTIVE FOR TOO LONG, GIVE_UP");
            this.killSocket("INACTIVE");
            // console.log(this.status.getValue());
            // setTimeout(() => {
            //     console.log(this.status.getValue());
            // }, 10)
        }, CLOSE_IF_NO_DATA_RECEIVED_AFTER_MS);
        this.closeOnNoPongTimer = fancyTimer("pong", () => {
            if (this.ws) {
                console.log("😡😡 Close the weboscket because we did not hear __pong__!")
                this.closeReason = "PONG_NOT_HEARD";
                this.ws.close();
            }
        }, seconds(1.5));
        this.failToOpenTimer = fancyTimer("failToOpen", () => {
            if (this.ws && this.ws.readyState !== this.ws.OPEN) {
                this.closeReason = "FAILED_TO_CONNECT_IN_TIME";
                this.ws.close();
            }
        }, CLOSE_WS_IF_NOT_CONNECTED_AFTER_MS);

        setInterval(() => {
            this.updateTimerCountdowns();
        }, 1000);
    }

    private updateTimerCountdowns() {
        // this is for debugging.
        this.timerCountdowns.next({
            "ping in x time": this.pingTimer.getCountdown(),
            "reconnect on close timer": this.reconnectTimer.getCountdown(),
            "shut down if no msg recived timer": this.inactivityTimer.getCountdown(),
            "waiting for pong timer": this.closeOnNoPongTimer.getCountdown(),
            "failed to open timer": this.failToOpenTimer.getCountdown()
        })
    }

    private createNewWebSocket() {

        this.closeOnNoPongTimer.stop();
        this.reconnectTimer.stop();

        console.log("creating new WebSocket...");
        
        this.status.next("CONNECTING");
        this.closeReason = "UNKNOWN";
        this.ws = new WebSocket(this.url);

        this.failToOpenTimer.start();

        this.ws.onclose = (e:CloseEvent) => {

            console.log("❤️‍🔥❤️‍🔥❤️‍🔥 WEB SOCKET CLOSED!", e);
            this.failToOpenTimer.stop();
            this.pingTimer.stop();

            switch (this.closeReason) {

                // Four scenarios:
                // 1. Try again immediately
                // 2. Try again after a delay
                // 3. Give up for now
                // 4. Give up for good - status will tell UI to kick 'em out of whatever

                case "PONG_NOT_HEARD": {
                    this.status.next("DISCONNECTED");
                    // attempt reconnect immediately
                    this.createNewWebSocket();
                    return;
                }

                case "UNKNOWN":
                case "FAILED_TO_CONNECT_IN_TIME": {
                    this.status.next("DISCONNECTED");
                    this.scheduleReconnectAttempt();
                    return;
                }

                case "NOTHING_TO_LISTEN_TO":
                case "INACTIVE": {
                    this.status.next("DISCONNECTED");
                    return;
                }

                case "GAVE_UP_RECONNECTING":
                case "DISPOSED": {
                    this.status.next("GAVE_UP");
                    return;
                }
            }
            
        }


        this.ws.onmessage = (e:MessageEvent) => {

            let msg:IncomingMsg;

            if (e.data === "__pong__") {
                if (this.ignorePongs) {
                    console.log("IGNORING PONG TO SIMULATE NO RESPONSE");
                    return;
                }
                console.log("...pong received");
                this.closeOnNoPongTimer.stop();
                this.pingTimer.start();
                return;
            }

            try {
                msg = JSON.parse(e.data);
                if (typeof msg !== "object") throw new Error("not object");
                if (typeof msg.channelId !== "string" || !msg.channelId) throw new Error("bad channelId");
                // if (typeof msg.routeName !== "string" || !msg.routeName) throw new Error("bad routeName");
                if (typeof msg.payload === "undefined") throw new Error("bad payload");
                console.log("MSG", msg);
            } catch (err) {
                console.log("Invalid incoming message received.", err);
                return;
            }

            // const id = getId(msg.routeName, msg.channelId);
            const ch = this.channels.get(msg.channelId);
            if (ch) {
                this.pingTimer.reset();
                this.inactivityTimer.reset();
                ch.state.next({
                    status: "CONNECTED",
                    value: ch.onMsg ? ch.onMsg(msg.payload) : msg.payload
                })
            } else {
                console.log("received a msg for a channel we are not listening to", msg.channelId);
            }
        }

        this.ws.onerror = (e:Event) => {
            console.log("ws onerror", e);
        }

        this.ws.onopen = (e:Event) => {
            console.log("WS OPEN");
            this.reconnectAttempts = 0;
            this.beganReconnectingAt = 0;
            this.failToOpenTimer.stop();
            this.status.next("CONNECTED");
            this.sendJoinsOnReconnects();
            this.inactivityTimer.start();
            this.pingTimer.start();
        }
    }

    private scheduleReconnectAttempt() {
        // determine how long to wait before trying again
        const t = RECONNECT_INTVERAL_MS * (Math.pow(RECONNECT_DECAY, this.reconnectAttempts) - 1);
        const delay = t > MAX_RECONNECT_INTERVAL_MS ? MAX_RECONNECT_INTERVAL_MS : t;
        console.log(`delay=${delay}, attempst=${this.reconnectAttempts}`);
        if (this.beganReconnectingAt === 0) {
            this.beganReconnectingAt = Date.now();
        } else if (this.beganReconnectingAt + GIVE_UP_RECONNECT_AFTER_MS < Date.now()) {
            console.log("--GIVE UP RECONNECTING! we have been trying too long.");
            this.killSocket("GAVE_UP_RECONNECTING");
            return;
        }
        this.reconnectTimer.start(delay);
    }

    private ping() {
        this.closeOnNoPongTimer.stop();
        if (!this.ws) return;
        if (this.ws.readyState === this.ws.OPEN) {
            console.log("🏈 SENDING PING!");
            this.ws.send("__ping__");
        }
        this.closeOnNoPongTimer.start();
    }


    private canSend():boolean {
        if (!this.ws) return false;
        return this.ws.readyState === this.ws.OPEN;
    }

    // private trySend(x:IncomingToServerJeffsocketMsg) {
    //     // There is a brief period between CONNECTING and CONNECTED where we cannot send.
    //     // Store all outgoing messages in a queue until we can send them.
    //     if (this.ws && this.canSend()) {
    //         this.ws.send(JSON.stringify(x));
    //         return true;
    //     }
    //     return false;
    // }


    public joinChannel<Msg={}>(
        channelId:string,
        params:any={},
        modifyFn?:(x:any) => Msg|null|undefined
    ):Observable<ChannelState<Msg>> {

        if (!this.ws) this.createNewWebSocket();

        const channel = this.channels.get(channelId);
        if (channel) return channel.state.asObservable() as Observable<ChannelState<Msg>>;
        console.log('RT listening for channel', channelId);
        const newChannel:ChannelConfig<Msg> = {
            channelId,
            onMsg:modifyFn,
            params,
            state: new BehaviorSubject<ChannelState<Msg>>({ status: "INITIALIZING", value: null })
        }
        this.channels.set(channelId, newChannel);
        if (this.canSend()) {
            this.requestJoinChannel(channelId, params);
        }
        return newChannel.state.asObservable() as Observable<ChannelState<Msg>>;
    }

    // public listen(routeName:string, channelId:string, params:any) {

    //     if (!this.ws) this.createNewWebSocket();

    //     const id = getId(routeName, channelId);
    //     const sub = this.channels.get(id);
    //     // subscription already exists
    //     if (sub) return sub.incoming$.asObservable();

    //     // create new connection.
    //     // const incoming$ = new Subject<any>();
    //     const incoming$ = new BehaviorSubject<any>(NO_MSG_YET_RECEIVED);
    //     const newSub:RoutedChannelSubscription = {
    //         routeName,
    //         channelId,
    //         params,
    //         incoming$
    //     }        
    //     this.channels.set(id, newSub)
    //     if (!this.trySendJoin(newSub)) {
    //         console.log("We'll have to send join once connected");
    //     }
    //     return incoming$;
    // }


    public doesChannelExist(channelId:string) {
        return this.channels.has(channelId);
    }

    public getLastChannelValue(channelId:string) {
        const ch = this.channels.get(channelId);
        return ch?.state.getValue();
    }

    private requestJoinChannel(channelId:string, params:any = {}) {
        console.log('RT requesting to join channel', channelId);
        const req:RTJoinReq = {
            action: "JOIN_CHANNEL",
            channelId,
            params
        }
        this.makeRequest(req);
    }

    private makeRequest(req:RTReq) {
        if (!this.ws) throw new Error('tried to send websocket msg before connected');
        this.ws.send(JSON.stringify(req));
    }

    private sendJoinsOnReconnects() {
        this.channels.forEach(ch => this.requestJoinChannel(ch.channelId, ch.params));
    }

    // private trySendJoin(x:RoutedChannelSubscription) {
    //     return this.trySend({
    //         action: "JOIN",
    //         name: x.routeName,
    //         channelId: x.channelId,
    //         params: x.params
    //     })
    // }

    // public leaveChannel(channelId:string) {
    //     this.log('RT leave channel', channelId);
    //     const ch = this.channels.get(channelId);
    //     if (ch) {
    //         console.log('LEAVE CHANNEL - we DO !!! have a channel', channelId);
    //         this.tellServerWeStoppedListening(ch);
    //     } else {
    //         console.log('LEAVE CHANNEL - we DO NOT have a channel', channelId);
    //     }
    //     console.log('LEAVE CHANNEL - send end of stream symbol');
    //     this._incoming.next({
    //         channelId,
    //         payload: END_STREAM_SYMBOL
    //     })
    // }

    public leaveChannel(channelId:string) {
        // const id = getId(routeName, channelId);
        const ch = this.channels.get(channelId);
        if (!ch) return;
        ch.state.complete();
        // ch.incoming$.complete();
        this.channels.delete(channelId);
        // This one isn't critical, if server never hears the leave, worst case
        // is you (client) receives msgs but ignores them
        const req:RTLeaveReq = {
            action: "LEAVE_CHANNEL",
            channelId: ch.channelId
        }
        this.makeRequest(req);
        if (this.channels.size === 0) {
            this.killSocket("NOTHING_TO_LISTEN_TO");
        }
    }

    private killSocket(reason:CloseReason) {
        this.stopAllTimers();
        if (this.ws) {
            this.closeReason = reason;
            this.ws.close();
            this.ws = null;
        }
    }

    private stopAllTimers = () => {
        this.failToOpenTimer.stop();
        this.closeOnNoPongTimer.stop();
        this.pingTimer.stop();
        this.inactivityTimer.stop();
        this.reconnectTimer.stop();
    }

    public dispose() {
        window.removeEventListener("focus", this.onWindowFocus);
        this.killSocket("DISPOSED");
    }

}
