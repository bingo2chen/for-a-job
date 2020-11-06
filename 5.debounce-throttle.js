// 防抖
const debounce = (fn, delay) => {
  let timer = null
  clearInterval(timer)
  return (...args) => {
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}


// 节流
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