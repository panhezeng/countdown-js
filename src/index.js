export class Countdown {
  /**
   * @param nowTime 当前时间戳，毫秒
   * @param endTime 结束时间戳，毫秒, 必填
   * @param onUpdate 倒计时更新回调函数，必填，回调传值，倒计时对象{days,hours,minutes,seconds}
   * @param onComplete 倒计时结束回调函数
   * @param autoStart 自动开始倒计时，默认true
   * @param update 初始化后立即执行一次更新回调函数，默认false
   * @param padStart 更新回调函数返回对象的时间是否补零，默认true
   * @param delay 触发更新回调函数的间隔时间，默认1000毫秒
   */
  constructor ({nowTime, endTime, onUpdate, onComplete, autoStart = true, update = false, padStart, delay}) {

    this.unit = {}
    this.unit.seconds = 1000
    this.unit.minutes = this.unit.seconds * 60
    this.unit.hours = this.unit.minutes * 60
    this.unit.days = this.unit.hours * 24

    this.tid = 0

    this.init({nowTime, endTime, onUpdate, onComplete, update, padStart, delay})
    if (autoStart) {
      this.start()
    }
  }

  init ({nowTime = new Date().getTime(), endTime, onUpdate, onComplete, update = false, padStart = true, delay = 1000}) {

    if (nowTime) this.nowTime = nowTime
    if (endTime) this.endTime = endTime
    if (onUpdate) this.onUpdate = onUpdate
    if (onComplete) this.onComplete = onComplete
    if (padStart) this.padStart = padStart
    if (delay) this.delay = delay

    if (Object.prototype.toString.call(this.nowTime) !== '[object Number]') {
      throw new Error('nowTime必须是数字')
    }
    if (Object.prototype.toString.call(this.endTime) !== '[object Number]') {
      throw new Error('endTime必须是数字')
    }

    if (Object.prototype.toString.call(this.delay) !== '[object Number]') {
      throw new Error('delay必须是数字')
    }
    if (Object.prototype.toString.call(this.onUpdate) !== '[object Function]') {
      throw new Error('onUpdate必须是函数')
    }

    this.diff = this.endTime - this.nowTime

    if (this.diff < 0) {
      throw new Error('endTime不能小于nowTime')
    }

    if (update) {
      this.update()
    }

  }

  start () {
    if (this.tid) {
      throw new Error('倒计时已经运行中，请先调用clear方法清除')
    }
    if (this.diff && this.delay) this.tid = setInterval(this.update.bind(this), this.delay)
  }

  update () {
    this.onUpdate(this.getObject(this.diff))
    if (this.diff <= 0) {
      this.clear()
    }
    this.diff -= this.delay
  }

  getObject (time) {
    if (Object.prototype.toString.call(time) !== '[object Number]') {
      throw new Error('time必须是数字')
    }
    if (time <= 0) {
      time = 0
    }
    const days = Math.floor(time / this.unit.days)
    time %= this.unit.days
    const hours = Math.floor(time / this.unit.hours)
    time %= this.unit.hours
    const minutes = Math.floor(time / this.unit.minutes)
    time %= this.unit.minutes
    const seconds = Math.floor(time / this.unit.seconds)

    if (this.padStart) {
      return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      }
    }
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }

  clear (callback = true) {
    if (this.tid) {
      clearInterval(this.tid)
      this.tid = 0
      if (callback && Object.prototype.toString.call(this.onComplete) === '[object Function]') {
        this.onComplete()
      }
    }
  }

}







