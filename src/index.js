/**
 * @param nowTime 当前时间戳，毫秒
 * @param endTime 结束时间戳，毫秒
 * @param onUpdate 倒计时更新回调函数
 * @param onComplete 倒计时结束回调函数
 * @param autoStart 自动开始倒计时，默认true
 * @param padStart 更新回调函数返回对象的时间是否补零，默认true
 * @param delay 触发更新回调函数的间隔时间，默认1000毫秒
 * @return {{start: start, clear: clear, getObject: getObject, updateTime: updateTime}}
 */
export default function ({nowTime, endTime, onUpdate, onComplete, autoStart = true, padStart = true, delay = 1000}) {
  let tid, diff

  const unit = {}
  unit.seconds = 1000
  unit.minutes = unit.seconds * 60
  unit.hours = unit.minutes * 60
  unit.days = unit.hours * 24

  function getObject (time) {
    if (Object.prototype.toString.call(time) !== '[object Number]') {
      throw new Error('time必须是数字')
    }
    if (time <= 0) {
      time = 0
    }
    const days = Math.floor(time / unit.days)
    time %= unit.days
    const hours = Math.floor(time / unit.hours)
    time %= unit.hours
    const minutes = Math.floor(time / unit.minutes)
    time %= unit.minutes
    const seconds = Math.floor(time / unit.seconds)

    if (padStart) {
      return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      }
    }
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  function clear (callback = true) {
    if (tid) {
      clearInterval(tid)
    }
    tid = 0
    if (callback && Object.prototype.toString.call(onComplete) === '[object Function]') {
      onComplete()
    }
  }

  const update = () => {
    onUpdate(getObject(diff))
    if (diff <= 0) {
      clear()
    }
    diff -= delay
  }

  function start () {
    if (!tid) {
      if (Object.prototype.toString.call(endTime) !== '[object Number]' || Object.prototype.toString.call(onUpdate) !== '[object Function]') {
        throw new Error('endTime必须是数字，onUpdate必须是函数')
      }
      if (Object.prototype.toString.call(nowTime) !== '[object Number]') {
        nowTime = new Date().getTime()
      }
      diff = endTime - nowTime
      tid = setInterval(update, delay)
      update()
    }
  }

  if (autoStart) {
    start()
  }

  function updateTime ({nowTime, endTime}) {
    diff = endTime - nowTime
  }

  return {
    start,
    clear,
    getObject,
    updateTime,
  }
}
