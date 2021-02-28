import { Subject, Observable, BehaviorSubject } from 'rxjs';
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

export interface RTPushMsg {
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

export class RealTimerClient {

    private ws:WebSocket|null;
    private url:string;
    private log:(...args:string[]) => void;
    private _incoming:Subject<RTPushMsg>;
    // private listeners:Map<string, Observable<any>>;
    private channels:Map<string, ChannelConfig<any>>;
    public ready:BehaviorSubject<boolean>;
    private lastMsgReceived:number;
    private retryCount:number;

    constructor(url:string, log?:(...args:string[]) => void) {
        this.url = url;
        this.lastMsgReceived = 0;
        this.channels = new Map<string, ChannelConfig<any>>();
        this.log = log ?? noop;
        this._incoming = new Subject<any>();
        this.retryCount = 0;
        this.ws = null;
        this.ready = new BehaviorSubject<boolean>(false);
        this.connect();
        this._incoming.subscribe(x => {
            if (x.channelId === '*') {
                // What is the point of this? I had an idea for it, but, not using it.
                if (x.payload === WS_CLOSED_SYMBOL) {
                    // Tell all channels about this.
                    this.channels.forEach(ch => {
                        ch.state.next({
                            status: "TIMED_OUT",
                            value: null
                        })
                    })
                }
            } else {
                const ch = this.channels.get(x.channelId);
                if (ch) {
                    if (x.payload === EXPIRED_SYMBOL) {
                        this.log('>>>> EXPIRED', ch.channelId);
                        ch.state.next({
                            status: "EXPIRED",
                            value: null
                        }) 
                    } else if (x.payload === END_STREAM_SYMBOL) {
                        this.log('>>>> END_STREAM', ch.channelId);                        
                        this.tellServerWeStoppedListening(ch);
                        ch.state.next({
                            status: "NOT_CONNECTED",
                            value: null
                        })
                    } else if (x.payload === COULD_NOT_JOIN) {
                        this.log('>>>> FAILED_TO_JOIN', ch.channelId);
                        ch.state.next({
                            status: "FAILED_TO_JOIN",
                            value: null
                        })
                    } else {
                        // Normal msg. Good.
                        ch.state.next({
                            status: "CONNECTED",
                            value: ch.onMsg ? ch.onMsg(x.payload) : x.payload
                        })
                    }
                } else {
                    this.log('>>>> UNKNOWN CHANNEL', x.channelId);
                }
            }
        })
    }

    private checkPayload(x:any) {
        if (x === 'CANNOT_JOIN') return COULD_NOT_JOIN;
        if (x === 'EXPIRED') return EXPIRED_SYMBOL;
        return x;
    }

    // private reconnect() {
    //     if (!RECONNECT) return;
    //     if (!this.ws) {
    //         this.connect();
    //         return;
    //     }
    //     const { readyState } = this.ws;
    //     // four readyState values: CONNECTING, OPEN, CLOSING, CLOSED
    //     if (readyState === this.ws.OPEN || readyState === this.ws.CONNECTING) {
    //         this.log('--- be patient, do not reconnect, we are still attempting a connection');
    //         return;
    //     }
    //     this.log('RT ---> Reconnecting ws because we were: ' + readyState);
    //     this.connect();
    // }

    private connect() {
        // YOU ONLY EVER CONNECT ONCE (reconnect in the future version)
        // First time you "listen" to a channel will make you connect.
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (evt:any) => {
            this.log('>> RT CONN OPENED');
            this.retryCount = 0;
            this.ready.next(true);
            // Any channels that already exist...must be join server
            this.channels.forEach(channel => {
                this.requestJoinChannel(channel.channelId, channel.params);
            })
        }
        this.ws.onmessage = (evt:any) => {
            const obj:any = JSON.parse(evt.data);
            this.log('>> RT MSG RECEIVED', obj?.channelId);
            this.lastMsgReceived = Date.now();
            this._incoming.next({
                channelId: obj.channelId,
                payload: this.checkPayload(obj.payload)
            })
        }
        this.ws.onclose = (evt:any) => {
            // we should reconnect if our last action was within some timeframe
            // do we ever send close ourselves? NO.
            // we close "channels", which are abstract things we invented anyway.
            // emit something to end the subscription
            this.log('>> RT CONN CLOSED');
            this.ready.next(false);
            // We should try to re-connect.
            const msSinceLastAction = Date.now() - this.lastMsgReceived;
            
            if (msSinceLastAction < RECONNECT_IF_DISCONNECTED_AND_LAST_ACTION_WITHIN_X_MS && this.retryCount < MAX_RETRIES) {
                setTimeout(() => {
                    // pause, then, reconnect
                    this.retryCount++;
                    this.connect();
                }, 300 + (this.retryCount * 100));
            } else {
                // It's over. we are done.
                // tell all channels, we are done.
                this._incoming.next({ channelId: "*", payload: WS_CLOSED_SYMBOL }) 
            }
            // this.listeners.clear();
            // this._incoming.next({ channelId: "*", payload: END_STREAM_SYMBOL })
        }
    }

    private tellServerWeStoppedListening(ch:ChannelConfig<any>) {
        if (this.webSocketReady()) return;
        // Tell server we have quit listening.
        const currState = ch.state.getValue();
        console.log('--leave server?', currState.status);
        if (currState.status !== "CONNECTED") {
            console.log('no reason to tell server to stop sending to us, we are not connected');
            return;
        }
        const req:RTLeaveReq = {
            action: "LEAVE_CHANNEL",
            channelId: ch.channelId
        }
        this.makeRequest(req);
    } 

    public leaveChannel(channelId:string) {
        this.log('RT leave channel', channelId);
        const ch = this.channels.get(channelId);
        if (ch) {
            console.log('LEAVE CHANNEL - we DO !!! have a channel', channelId);
            this.tellServerWeStoppedListening(ch);
        } else {
            console.log('LEAVE CHANNEL - we DO NOT have a channel', channelId);
        }
        console.log('LEAVE CHANNEL - send end of stream symbol');
        this._incoming.next({
            channelId,
            payload: END_STREAM_SYMBOL
        })
    }

    public disposeChannel(channelId:string) {
        // TODO: check if status is NOT_CONNECTED first
        this.channels.delete(channelId);
    }

    private webSocketReady():boolean {
        if (!this.ws) return false; // this is weird, shouldn't ever happen
        if (this.ws.readyState === this.ws.OPEN) return true;
        return false;
    }


    public doesChannelExist(channelId:string) {
        return this.channels.has(channelId);
    }

    public getLastChannelValue(channelId:string) {
        const ch = this.channels.get(channelId);
        return ch?.state.getValue();
    }

    public joinChannel<Msg={}>(channelId:string, params:any={}, modifyFn?:(x:any) => Msg|null|undefined):Observable<ChannelState<Msg>> {
        const channel = this.channels.get(channelId);
        if (channel) return channel.state.asObservable() as Observable<ChannelState<Msg>>;
        this.log('RT listening for channel', channelId);
        const newChannel:ChannelConfig<Msg> = {
            channelId,
            onMsg:modifyFn,
            params,
            state: new BehaviorSubject<ChannelState<Msg>>({ status: "INITIALIZING", value: null })
        }
        this.channels.set(channelId, newChannel);
        if (this.webSocketReady()) {
            this.requestJoinChannel(channelId, params);
        // } else {
            // this.reconnect();
        }
        return newChannel.state.asObservable() as Observable<ChannelState<Msg>>;
    }

    private requestJoinChannel(channelId:string, params:any = {}) {
        this.log('RT requesting to join channel', channelId);
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
}