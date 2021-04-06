---
sidebar: false
date: "2019-12-4"
tag: javascript
title: call、apply、bind
category: 
- frontEnd
---


 
这三个方法平时工作中用的不是太多，只是了解基本使用方法，三者功能都有类似的地方，特别是call和apply，觉得可以深入学习下，好好总结下三者的细微区别

 <!-- more -->
## apply()
> 调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

### 参数
> func.apply(thisArg, [argsArray]) 参数都是可选
- thisArg：需要使用的this值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数，从ECMAScript 5 开始可以使用类数组对象。
  
### 实例
#### 用 apply 将数组添加到另一个数组
你可能已经想到使用concat，这没问题，完全可以实现，但concat是返回的一个新数组，而如何可以把一个新数组添加到一个既有数组中呢？要是写循环就太low了，要知道apply参数就是数据，所以交给apply吧
```js
let arr1=[1,2,3];
let arr2=[4,5,6];
arr1.push.apply(arr1,arr2);
console.log(arr1);//[1,2,3,4,5,6]
```
#### 使用apply和内置函数
使用Math.max/Math.min很简单很方便的就可以找出一个数组中的最大/最小值。
```js
const numbers = [1,2,3,4,5,6,7];
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);
console.log(max);//7
console.log(min);//1
```
::: warning 注意
参数个数是有限制的，如果太多会有超出JavaScript引擎的参数长度限制的风险，当你对一个方法传入非常多的参数（比如一万个）时，就非常有可能会导致越界问题, 这个临界值是根据不同的 JavaScript 引擎而定的（JavaScript 核心中已经做了硬编码  参数个数限制在65536），因为这个限制（实际上也是任何用到超大栈空间的行为的自然表现）是未指定的. 有些引擎会抛出异常
:::  
当然针对参数过多可能发生的潜在的越界问题可以用分片的方法解决的

```js
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 2;//每次截取两个参数
  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    let minLength = Math.min(i + QUANTUM, len);//已经截取数超过原数组长度就按数组长度来
    let arrSlice = arr.slice(i, minLength);//截取数组
    var submin = Math.min.apply(null, arrSlice);//获取本组最小
    // console.log("i:", i)
    // console.log("minLength:", minLength)
    // console.log("arrSlice:", arrSlice)
    min = Math.min(submin, min);//和上一组比对结果对比
  }
  return min;
}
var min = minOfArray([5, 6, 2, 3, 7]);
console.log(min);//2
```



## call()
和apply相比，除了参数是个列表没啥区别，主要看一下使用场景和使用方法


### 实际运用
#### 使用 call 方法调用父构造函数

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.call(this, name, price);//调用Product构造函数，并传入参数，达到通过调用父构造函数的 call 方法来实现继承
  this.category = 'food';
}
console.log(new Food('cheese', 5).name);//cheese
```
#### 使用 call 方法调用匿名函数
```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
// #0 Lion: King
// #1 Whale: Fail
```
#### 使用 call 方法调用函数并且指定上下文的 'this'(改变this指向)
当调用 greet 方法的时候，该方法的this值会绑定到 obj 对象。
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}
var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};
greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

#### 使用 call 方法调用函数并且不指定第一个参数（argument）
调用了 display 方法，但并没有传递它的第一个参数。如果没有传递第一个参数，this 的值将会被绑定为全局对象。
::: warning 注意
在严格模式下，this 的值将会是 undefined。
:::
```js
var sData = 'Wisen';
function display() {
  console.log('sData value is %s ', this.sData);
}
display.call();  // sData value is Wisen
```




## bind()
> 创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。返回一个原函数的拷贝，并拥有指定的 this 值和初始参数

### 参数
> function.bind(thisArg[, arg1[, arg2[, ...]]])
- thisArg：
调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg
- arg1, arg2, ...：
当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

### 实例
#### 创建绑定函数
bind() 用法创建一个函数，不论怎么调用，这个函数都有同样的 this 值。
```js
this.a = 1;//浏览器中，this默认指向全局的‘window’对象
let obj = {
  a: 2,
  getA: function (args) {
    return this.a + (args ? args : 0);
  },
};
console.log(obj.getA());//2 (调用对象是obj)
let getAFun = obj.getA;
console.log(getAFun());//1 函数是在全局作用域中调用的

let boundGetA = getAFun.bind(obj, "参数");//使用bind()方法重新创建一个函数并把this绑定到obj上
console.log(boundGetA());//"2参数"
```

#### 偏函数
bind() 的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面
```js
function list() {
  return Array.prototype.slice.call(arguments);
}
function addArguments(arg1, arg2) {
    return arg1 + arg2
}
var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数(37)列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数(37)
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]  调用时没有传入参数，那就默认创建时的预设参数

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3] 调用时 传入参数，依次排列在预设参数后面

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略因为原函数只有两个参数
```

#### setTimeout中的this

在使用`window.setTimeout()`时，this关键字会指向`window`或`global`对象，当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。
::: tip 灵光乍现
- 除了用bind方法，其实直接用箭头函数也是可以得到类实例的，因为箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
- 也可以把this值赋值给一个私有变量，再在定时器内部引用即可
:::
```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
  console.log("1");
  setTimeout(this.declare.bind(this), 1000);
  // setTimeout(()=>this.declare())), 1000);
};

LateBloomer.prototype.declare = function () {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```


### 总结
-  apply()和call()非常相似，唯一区别是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。
-  bind()是创建一个新的函数，调用时执行；而call()和apply()直接调用一个函数
-  call()、apply()和bind()都是用来改变函数执行时的上下文(this)，可借助它们实现继承