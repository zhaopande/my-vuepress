---
sidebar: false
date: "2021-4-6"
tag: javascript 
category: 
- frontEnd
title: new-关键字实现
---

##  new


``` js
function myCreate(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

function myNew() {
  // 用shift取出第一个参数(arguments类数组的第一个元素)
  const obj = [].shift.call(arguments);
  // 创建一个空对象并继承传入函数的原型，继承构造函数原型属性方法
  const newObj = Object.create(obj.prototype);
  // 绑定this，实现构造函数继承，继承构造函数上面的属性方法
  const res = obj.apply(newObj, arguments);
  // 优先返回函数返回的对象，否则返回新对象
  return res instanceof Object ? res : newObj;
}

function test(name) {
  this.name = name;
}
const t = myNew(test, "zp");
console.log(t instanceof test); // 检查test构造函数的原型是否存在于t这个实例的原型链上
console.log(t.name); // zp

```