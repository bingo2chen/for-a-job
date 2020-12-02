// 防抖 - 短时间大量触发同一事件只会执行一次函数
const debounce = (fn, delay) => {
  let timer = null
  clearInterval(timer)
  return (...args) => {
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}


// 节流 - 在函数执行一次后，在一定时间内不再工作
const throttle = (fn, delay) => {
  let flag = true
  return (...args) => {
    if (!flag) {
      return
    }
    setTimeout(() => {
      flag = false
      fn.apply(this, args)
    }, delay);
  }
}