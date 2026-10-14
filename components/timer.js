class Timer {

    constructor(gameSettings) {
        this.time = 0;
        this.refreshTimeMs = gameSettings.refreshTimeMs;
    }

    increment() {
        this.time += this.refreshTimeMs;
    }
}

export default Timer;