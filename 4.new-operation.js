const myNew = function(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error(fn + 'is not a constructor')
  }
  const obj = {}
  obj.__proto__ = fn.prototype
  const ret = fn.apply(obj, args)
  return ret instanceof fn ? ret : obj
}


// 测试代码
function Foo(name, age) {
  this.name = name
  this.age = age
}

const f = myNew(Foo, 'Lily', 18)
console.log(f);
