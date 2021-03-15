---
sidebar: false
date: "2021-2-24"
tag: koa
category: 
 - backEnd
title: webpack-hot-middleware在koa中调用
---


```js
"use strict";
const webpackHotMiddleware = require("webpack-hot-middleware");

module.exports = function(compiler, options) {
  const webpackHot = webpackHotMiddleware(compiler, options);

  return async function(ctx, next) {
    const originalEnd = ctx.res.end;

    await new Promise((resolve) => {
      ctx.res.end = function() {
        originalEnd.apply(this, arguments);
        resolve();
      };

      webpackHot(ctx.req, ctx.res, function() {
        resolve();
      });
    });
    await next();
  };
};



```