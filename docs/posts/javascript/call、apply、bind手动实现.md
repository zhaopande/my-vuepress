---
sidebar: false
date: "2021-4-6"
tag: javascript 
category: 
- frontEnd
title: call、apply、bind手动实现
---


## call

```js

//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.MyCall = function (fn, ...args) {
  console.log(this);
  //这里默认不传就是给window
  const context = fn || window;
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  // 绑定函数
  context[key] = this;
  // 通过隐式绑定的方式调用函数
  const res = context[key](...args);
  console.log("res:", res);
  // 删除属性
  delete context[key];
  // 返回函数调用的结果
  return res;
};

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.MyCall(this, name, price);
  this.category = "food";
}
const newFood = new Food("cheese", 5);
console.log(newFood); //Food { name: 'cheese', price: 5, category: 'food' }
console.log(newFood instanceof Product);

const arr1 = [1, 2, 3],
  arr2 = [3, 4, 5];
arr1.push.MyCall(arr2, ...arr1);
console.log(arr1, arr2); //[ 1, 2, 3 ] [ 3, 4, 5, 1, 2, 3 ]

```



## apply

```js 
/**
 * @arg Array|ArrayLike call传入的是多个参数apply是一个参数
 */
Function.prototype.myApply = function (fn, arg) {
  const context = fn || window;
  const key = Symbol();
  context[key] = this;
  const res = context[key](...arg);
  delete context[key];
  return res;
};

const arr1 = [1, 2, 3],
  arr2 = [3, 4, 5];
arr1.push.myApply(arr2, arr1);
console.log(arr1, arr2); //[ 1, 2, 3 ] [ 3, 4, 5, 1, 2, 3 ]


```


## bind


``` js
/**
 * @arg ArrayLike
 */
Function.prototype.myBind = function (context, ...args) {
  const _this = this;
  let newFn = function newFn(...funArgs) {
    // 使用apply 把函数属性和方法绑定到context
    // 构造函数被new的情况下，new这样优先级高于bind方法的时候，bind改变this指向会无效。
    // this instanceof newFn===true，this指向实例本身，因此直接取原来的this
    return _this.apply(this instanceof newFn ? this : context, [
      ...args,
      ...funArgs,
    ]);
  };
  // 继承原函数的原型，如果不写这一步，绑定在原函数prototype上的属性和方法将会被替换
  newFn.prototype = Object.create(this.prototype || null);
  return newFn;
};
var module = {
  x: 8,
  getX: function (...a) {
    this.b = 1;
    this.a = a[0];
    console.log("a:", ...a);
    console.log("x:", this.x);
  },
};

module.getX(); // 8
var retrieveX = module.getX;
retrieveX.prototype.xixi = function (xi) {
  console.log("xi:", xi);
  return "xixi";
};
const bindGetX = retrieveX.myBind(module, 1, 2);

console.log(bindGetX);
console.log("new:", new bindGetX(11, 2, 3)); //new: getX { b: 1, a: 1 }

class Test {
  constructor(argObj) {
    this.state = { a: argObj.a };
    this.f1 = this.f1.myBind(this);
  }
  f1() {
    console.log("functoin:", this);
    console.log(this.state.a);
    return "f1";
  }
  f2 = () => {
    console.log("arrow functoin:", this);
    console.log(this.state.a);
    return "f2";
  };
}

const t1 = new Test({ a: "aaa" });
const f1 = t1.f1;
const f2 = t1.f2;
console.log(f1());


```