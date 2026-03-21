export class Timer {
    constructor(onTick, onEnd) {
        this.seconds = 0;
        this.interval = null;
        this.onTick = onTick;
        this.onEnd = onEnd;
        this.mode = 'down'; // 'down' for timed, 'up' for free play
    }

    start(initialSeconds = 60) {
        if (this.interval) this.stop();

        this.seconds = initialSeconds === -1 ? 0 : initialSeconds;
        this.mode = initialSeconds === -1 ? 'up' : 'down';

        if (this.onTick) this.onTick(this.formatTime(), this.seconds <= 10 && this.mode === 'down');

        this.interval = setInterval(() => {
            if (this.mode === 'down') {
                this.seconds--;
                if (this.seconds <= 0) {
                    this.seconds = 0;
                    this.stop();
                    if (this.onEnd) this.onEnd();
                }
            } else {
                this.seconds++;
            }

            if (this.onTick) this.onTick(this.formatTime(), this.seconds <= 10 && this.mode === 'down');
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    formatTime() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    isActive() {
        return this.interval !== null;
    }
}
