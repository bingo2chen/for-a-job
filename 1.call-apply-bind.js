// 手写 call 函数
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}


// 手写 apply 函数
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    return new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}


// 手写 bind 函数 和 call 类似，但返回的是函数
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (_this instanceof F) {
      return new _this(args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

// 测试代码：
var obj = {
  value: 1
};

function foo() {
  console.log(this.value + '=======' + arguments);
}

foo.myCall(obj)

foo.myApply(obj)

foo.myBind(obj)


