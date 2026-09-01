export class Clock {
    private timerId: any = null;
    private interval: number;
    private callback: () => void;

    constructor(callback: () => void, interval: number = 1000) {
        this.callback = callback;
        this.interval = interval;
    }

    public start(): void {
        if (this.timerId) return;
        this.timerId = setInterval(() => {
            this.callback();
        }, this.interval);
    }

    public pause(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    public reset(newInterval?: number): void {
        this.pause();
        if (newInterval) {
            this.interval = newInterval;
        }
        this.start();
    }
}