class Timer {
    constructor(count = 0, step = 'increase') {
        this.count = count
        this.initialCount = count
        this.stepFlag = step
        this.interval = false

        this.render()
        this.start()
    }

    static createDecreaseTimerWithMinuteAndSecond(minute, sec) {
        const count = minute * 60 + sec

        return new Timer(count, 'decrease')
    }

    static createTimerWithHourAndMinuteAndSecond(hour, minute, sec, step = 'increase') {
        const count = hour * 60 * 60 + minute * 60 + sec

        return new Timer(count, step)
    }

    start() {
        if (this.interval)
            return

        this.interval = setInterval(this.step, 100)
    }

    stop() {
        clearInterval(this.interval)

        this.interval = false
    }

    reset() {
        clearInterval(this.interval)

        this.count = this.initialCount
        this.interval = false

        this.render()
    }

    step = () => {
        if (this.stepFlag === 'increase') {
            return this.increase()
        }

        return this.decrease()
    }

    increase = () => {
        this.count++

        this.render()
    }

    decrease = () => {
        if (this.count <= 1)
            this.stop()

        this.count--

        this.render()
    }

    render() {
        const sec = String(this.count % 60).padStart(2, '0')
        const minute = String(parseInt(this.count / 60) % 60).padStart(2, '0')
        const hour = String(parseInt(this.count / (60 * 60))).padStart(2, '0')

        document.getElementById('timer').innerText =
            `${minute}:${sec}`
    }
}
