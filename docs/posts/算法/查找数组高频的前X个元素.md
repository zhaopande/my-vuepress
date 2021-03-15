---
sidebar: false
date: "2021-1-16"
tag: 算法
title: 查找数组高频的前X个元素
category: 
- 算法
---

### 题目：给定一个非空整数数组，求出出现频率最高的前X个元素


```js
function highXFrequency(arr, index = 1) {
  let obj = {};
  let symbolArr = [];
  arr.map((val, i) => {
    if (obj[val]) {
      obj[val] = obj[val] + 1;
    } else {
      obj[val] = 1;
      symbolArr.push(val);
    }
  });
  symbolArr.sort((a, b) => obj[b] - obj[a]
  );

  return symbolArr.splice(0, index);
}

```

####  测试一下：
```js
const arr = [4, 4, 4, 1, 1, 2, 2, 2, 2];
console.log(highXFrequency(arr, 2));// [2, 4]
```