---
sidebar: false
date: "2020-2-20"
tag: javascript
title: javascript实现继承
category: 
- frontEnd
---

对于传统的C++/java等强类型语言来说，提供了基于`Class`的继承，通过扩展一个已有的Class,生成一个子类，javascript的ES6标准中引入了`class`关键字，加上`extend`关键字可以很简单的实现继承，但其实本质上还是基于`原型`实现的继承，只是个语法糖而已。今天就总结下JavaScript中的实现继承的方法。
 <!-- more -->

### 原型继承

> 原型链是实现原型继承的主要方法，基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。
> 
实现如下:
```js
function Parent(){
 this.parentValue=1;
}
 
Parent.prototype.getParentValue=function(){
  return this.parentValue;
}
 
function Son(){
  this.sonproperty=false;
}
 
Son.prototype=new Parent();

Son.prototype.getSonValue=function(){
     return this.sonproperty;
};

var sons=new Son();
console.log(sons.getParentValue()); //1;
```
上方示例中，共有两个对象Parent和Son，通过把Parent的实例赋给Son.prototype属性，重写了Son的原型，实现了两个对象之间的继承。
这样Son的原型就会存在一个指针，这个指针指向了Parent的原型对象，所以Parent中实例中的方法和属性也就存在于Son.prototype中了。而且Son还可以自己添加属于自己的属性和方法

#### 原型继承注意事项
1、确定原型和实例的关系
- instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上,存在即返回true
- 使用isPrototypeOf()方法。同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此isPrototypeOf()方法也会返回true。

2、需注意
- 如果需要在子类原型上定义新的方法和属性，需要在继承后定义，因为写在继承前的方法和属性在继承时会被覆盖掉
- 使用字面量定义的情况，相当于prototype属性被重写，所以也会出现第三种情况
- 父类中存在引用类型，这时继承后，每次对子类的实例化都会共享这个引用类型，也就是说不同实例下的修改都会影响到全部。


::: warning 原型继承的缺点
- 上面提到的在父类有引用类型的时候操作单个实例会影响到所有实例
- 无法再不影响所有实例的情况下给父类传参
:::
### 构造函数继承
> 在子类型构造函数的内部调用超类型构造函数,叫做借用构造函数 (constructor stealing）的技术（有时候也叫做伪造对象或经典继承）,用于解决原型中包含引用类型值所带来问题
> 
示例如下：
```js 
function Parent(){
	this.persons=["小明","小强"];
}
function Son(){
	Parent.call(this);//继承Parent
}
let son1=new Son();
son1.persons.push("小辉");
console.log(son1.persons);//["小明", "小强", "小辉"]
let son2=new Son();
son2.persons.push("贾斯丁");
console.log(son2.persons);//["小明", "小强", "贾斯丁"]
```
#### 基本思想
- 借用构造函数的基本思想就是利用call或者apply把父类中通过this指定的属性和方法复制（借用）到子类创建的实例中。因为this对象是在运行时基于函数的执行环境绑定的。也就是说，在全局中，this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。call 、apply方法可以用来代替另一个对象调用一个方法。call、apply 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。
- 所以，这个借用构造函数就是，new对象的时候(注意，new操作符与直接调用是不同的，以函数的方式直接调用的时候，this指向window，new创建的时候，this指向创建的这个实例)，创建了一个新的实例对象，并且执行Son里面的代码，而Son里面用call调用了Parent，也就是说把this指向改成了指向新的实例，所以就会把Parent里面的this相关属性和方法赋值到新的实例上，而不是赋值到Son上面。所有实例中就拥有了父类定义的这些this的属性和方法。

::: tip 优势
相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向父类型构造函数传递参数。因为属性是绑定到this上面的，所以调用的时候才赋到相应的实例中，各个实例的值就不会互相影响了。
:::

::: warning 劣势
如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的(只是复用了this上的方法和属性)，结果所有类型都只能使用构造函数模式。考虑到这些问题，借用构造函数的技术也是很少单独使用的。
:::

### 组合继承

> 组合继承（combination inheritance），有时候也叫做伪经典继承。是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。   

```js
function Parent(hello){
  this.hello=hello;
  this.persons=["小明","小强"];
}
Parent.prototype.sayHello = function(){
  console.log(this.hello);
};
function Son(hello,age){
  Parent.call(this,hello);//继承Parent
  this.age=age;
}
//继承父类原型上的方法
Son.prototype = new Parent();
//矫正constructor
Son.prototype.constructor = Son;
//定义属于子类方法
Son.prototype.sayAge = function(){
  console.log(this.age);
};
let son1=new Son("你好！",21);
son1.persons.push("小辉");
son1.sayHello();//你好！
son1.sayAge();//21
console.log(son1.persons);//["小明", "小强", "小辉"]
let son2=new Son("hi!",22);
son2.persons.push("贾斯丁");
son2.sayHello();//hi！
son2.sayAge();//22
console.log(son2.persons);//["小明", "小强", "贾斯丁"]
```
::: tip 组合继承优势
将原型继承和构造函数继承的优点形成互补，弥补了他们各自的缺点，所以这种继承模式较为常用
:::

::: warning 组合继承劣势
在实现组合继承的过程中，无可避免的需要两次调用父类构造函数：
- 重写子类原型
- 实例化时子类内部调用
而且每次调用子类的构造函数都要重写一遍父类中的方法和属性
:::

### 寄生式继承

#### 原型式继承
了解寄生式继承前，相信大家已经用过了`Object.create()`方法创建对象，用现有的对象来提供新创建的对象的__proto__。返回一个新对象，带着指定的原型对象和属性,原型对象和属性分别是方法的参数1和参数2,在只想让一个对象和另一个对象建立继承关系的时候，可以直接使用这个方法，不兼容的情况下可以用以下方法。
手动实现如下:
```js
function createObject1(o){
  function Fun(){
  }
  Fun.prototype = o;
  return new Fun();
}
```
上正菜,在继承父类后，再自定义一些方法或属性
```js
function createObject2(par){
  let clone =createObject1(par);
  clone.prototype.sayHi=function(){
      return "hi!"
  };
 return  clone;
}
```

#### 寄生组合式继承
实质上，寄生组合继承是寄生式继承的加强版。这也是为了避免组合继承中无可避免地要调用两次父类构造函数的最佳方案。`所以，开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式`。

```js
function extend(Parent,Son){
  var prototype=createObject1(Parent.prototype);
  prototype.constructor=Son;
  Son.prototype=prototype;
}
function Parent(hello){
  this.hello=hello;
  this.persons=["小明","小强"];
}
Parent.prototype.sayHello = function(){
  return this.hello;
};
function Son(hello,age){
  Parent.call(this,hello);//继承Parent
  this.age=age;
}
extend(Parent,Son);
Son.prototype.sayAge=function(){
  return this.age;
}
let son1=new Son("你好",20);
son1.persons.push("张三");
console.log(son1.persons);//[ '小明', '小强', '张三' ]
console.log(son1.sayHello());//你好
console.log(son1.sayAge());//20

let son2=new Son("hi",21);
son2.persons.push("李四");
console.log(son2.persons);//[ '小明', '小强', '李四' ]
console.log(son2.sayHello());//hi
console.log(son2.sayAge());//21
```


### class继承

class类可以用`extends`关键字，来创建一个基于另一个类的子类，子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

```js 
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

#### ES5继承 VS ES6继承
- ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）
- ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

#### Class的继承链

大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

- 子类的__proto__属性，表示构造函数的继承，总是指向父类。
- 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

```js
class A {
    ...
}

class B extends A {
    ...
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```