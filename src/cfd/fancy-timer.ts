export class FancyTimer {

    private fn:() => void;
    private ms:number;
    private lastStarted = 0;
    private timer:NodeJS.Timeout|null = null;

    constructor(public name:string, fn:() => void, ms?:number) {
        this.fn = fn;
        this.ms = ms ?? 1000;
    }
    public start(ms?:number) {
        this.stop();
        if (ms !== undefined) this.ms = ms;
        this.lastStarted = Date.now();
        this.timer = setTimeout(() => {
            this.fn();
            this.timer = null;
        }, this.ms);
    }
    public reset() {
        this.start();
    }
    public stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    public getCountdown() {
        if (!this.timer) return -1;
        const timeElapsed = Date.now() - this.lastStarted;
        return this.ms - timeElapsed;
    }

}

export const fancyTimer = (name:string, fn:() => void, ms?:number) => new FancyTimer(name, fn, ms);