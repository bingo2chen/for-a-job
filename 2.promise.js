- '基础版：https://zhuanlan.zhihu.com/p/58428287'

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const _this = this
  _this.state = PENDING
  _this.value = null
  _this.resolvedCallbacks = []
  _this.rejectedCallbacks = []

  function resolved(value) {
    if (_this.state === PENDING) {
      _this.state = RESOLVED
      _this.value = value
      _this.resolvedCallbacks.map(cb => cb(_this.value))
    }
  }

  function rejected(value) {
    if (_this.state === PENDING) {
      _this.state = REJECTED
      _this.value = value
      _this.rejectedCallbacks.map(cb => cb(_this.value))
    }
  }
}

MyPromise.prototype.then = function (onFullFilled, onRejected) {
  const _this = this
  onFullFilled = 
    typeof onFullFilled === 'function' 
      ? onFullFilled 
      : v => v
  onRejected = 
    typeof onRejected === 'function' 
      ? onRejected
      : r => {
        throw r
      }
  if (_this.state === PENDING) {
    _this.resolvedCallbacks.push(onFullFilled)
    _this.rejectedCallbacks.push(onRejected)
  }
  if (_this.state === RESOLVED) {
    onFullFilled(_this.value)
  }
  if (_this.state === REJECTED) {
    onRejected(_this.value)
  }
}

MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const ret = []
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(res => {
        ret.push(res)
        if (promises.length === ret.length) {
          resolve(ret)
        }
      }).catch(reject)
    }
  })
}

MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(resolve).catch(reject)
    }
  })
}


