---
sidebar: false
date: "2019-10-29"
tag: vuepress
category: 
- frontEnd
title: vuepress项目部署到github
---

::: tip GitHub Pages
vuerepss项目部署到github后的两种访问方式
:::
 <!-- more -->
### 前言
- 假设已经建好了github仓库，而且已经写好了内容，然后就可以新建一个自动编译上传的脚本
```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

### 两种访问方式
-  `https://<USERNAME>.github.io`:
首先要把仓库名称改成`https://<USERNAME>.github.io`,项目配置文件`config.js`中`base`字段默认`/`，如果不是则需要改回来
- `https://<USERNAME>.github.io/<REPO>`:
仓库名称设置成`<REPO>`,把项目配置文件`config.js`中`base`字段改成`<REPO>`



