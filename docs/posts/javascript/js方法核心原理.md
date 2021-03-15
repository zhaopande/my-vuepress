---
sidebar: false
date: "2019-7-27"
tag: javascript
title: js方法核心原理
category: 
- frontEnd
---

# 实现一个call函数

```js
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
}
```
# 实现一个call函数2

``` js {5}
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
}
```

# indexOf()方法实现

```js
function indexOfFun(pStr, cStr, n) {
    // n为起始位置
    let i; // 循环变量
    let len1 = pStr.length; // 父串长度
    let len2 = cStr.length; // 子串长度

    if (n == undefined || n == null || n == -1) {
        i = 0;
    } else if (n > len1 - 1) { // 如果起始位置大于父串最后一位，返回-1，不存在
        return -1;
    } else { // 如果不存在上述情况，从第n位开始
        i = n;
    }

    if (len2 > len1) { // 如果子串长度大于父串，那么肯定不存在，返回-1
        return -1;
    } else if (len2 == len1) { // 如果相等，那就直接对比两个字符串是否相等
        if (cStr === pStr) { // 如果内容相等，那么就是从第一位开始的
            return 0;
        } else { // 如果内容不相等，那么返回-1
            return -1;
        }
    } else {
        let tempStr = '';
        while (i < len1) {
            // 截取父串，起始位置为i，每次长度为子串长度
            tempStr = pStr.substr(i, len2);
            if (cStr === tempStr) {
                return i; // 返回字符串第一次出现的位置
            }
            i++;
        }

        if (i == len1) { // 直到父元素的最后一位还没有出现相等，那么就是不存在返回-1
            return -1;
        }
    }
}
```