console.log('link countdown ok')


class Countdown {
    constructor(gameTime) {
        this.currentTime = gameTime; // --???-- in second ?
        this.intervalId = 0;
    }
    start(callback) {
        this.intervalId = setInterval(() => {
            this.currentTime--;
            callback();
        }, 1000)
    }

    getMinutes() {
        return (Math.floor(this.currentTime / 60))
    }
    getSeconds() {
        return this.currentTime % 60
    }
    twoDigitsNumber(time) {
        if (time < 10) {
            return `${time}`;
        } else {
            return `${time}`;
        }
    }
}