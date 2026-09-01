export class Clock {
    private timerId: any=null;
    private interval: number;
    private callback: ()  => void;


    constructor(callback: () => void, interval: number=1000) {
        this.callback = callback;
        this.interval = interval;
    }
    public start(): void {
        !this.timerId && (this.timerId = setInterval(() => {
            this.callback();
        }, this.interval));
    }

    public pause(): void {
        this.timerId && (clearInterval(this.timerId), this.timerId = null);
    }

    public reset(NewInterval?: number): void {
        this.pause();
        NewInterval && (this.interval = NewInterval);
        this.start();
    }
}