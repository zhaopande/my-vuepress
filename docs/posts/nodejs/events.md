---
sidebar: false
date: "2019-10-25"
tag: nodejs
title: events模块
category: 
 - backEnd
---

## 前言
在使用node或者node相关的库中，经常性的会发现on相关的事件监听函数，比如在使用node模块：`fs.ReadStream` 会在打开文件时触发事件，`stream`会在数据可读时触发事件。
这里就用到了node的一个核心模块--`events`,大多数node核心的API会习惯构建与基于异步事件驱动,利用对象的`触发器(Emitter)`来触发命名事件来调用事件的`监听函数(Listener)`,
所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。
```JS
var fs = require("fs");
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end',function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
```

### 基本使用
首先引入events模块，然后用自定义类继承`EventEmitter`实例，myEmitter.emit()用于触发事件，而myEmitter.on()用于注册监听函数。
- 说个题外话：这里采用ES6的extend关键字实现类继承，其实node中util模块中也有一种继承方式,但官方更推荐ES6方式
```JS
const EventEmitter = require('events');
const util = require('util');
// function MyEmitter(){
//    EventEmitter.call(this)
// }
//node提供的继承方法
// util.inherits(MyStream, EventEmitter);
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```

### 将参数和 this 传给监听器
可以将任意数量的参数传入监听函数中。 当监听器函数被调用时， `this` 关键词会被指向监听器所绑定的 `EventEmitter` 实例。
```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(val) {
  console.log('触发事件',this,val);
});
myEmitter.emit('event',11);
//打印： 
//触发事件 MyEmitter {
//   _events: { event: [Function] },
//   _eventsCount: 1,
//   _maxListeners: undefined } 11
```
但是如果使用箭头函数作为监听器会导致this指不到EventEmitter实例
```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (val) => {
  console.log('触发事件',this,val);
});
myEmitter.emit('event',11); 
//打印：
//触发事件 {} 11
```

### 异步 VS 同步
EventEmitter 会按照监听器注册的顺序同步地调用所有监听器。 所以必须确保事件的排序正确。 可以使用 setImmediate() 或 process.nextTick() 切换到异步模式：

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('异步进行');
  });
});
myEmitter.emit('event', 'a', 'b');
```
### once-仅处理一次
使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用
```js
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印: 1
myEmitter.emit('event');
// 不触发
```


### 错误-error
当 EventEmitter 实例出错时，应该触发 'error' 事件。 这些在 Node.js 中被视为特殊情况。
如果没有为 'error' 事件注册监听器，则当 'error' 事件触发时，会抛出错误、打印堆栈跟踪、并退出 Node.js 进程。
所以科学的写法应该是下面这样:

```js
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('错误信息');
});
myEmitter.emit('error', new Error('错误'));
// 打印: 错误信息
```
