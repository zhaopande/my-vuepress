---
sidebar: false
date: "2019-9-4"
tag: java
title: linux运行jar包、查看jar包进程、停止jar包
category: 
- backEnd
---

<!-- ## linux运行jar包、查看jar包进程、停止jar包 -->

打包成jar包可以直接使用java命令执行。在linux系统中运行jar包主要有以下四种方式:
 <!-- more -->



1、这是最基本的jar包执行方式，但是当我们用ctrl+c中断或者关闭窗口时，程序也会中断执行。
```s
java -jar XXX.jar
```


2、&代表在后台运行，使用ctrl+c不会中断程序的运行，但是关闭窗口会中断程序的运行。
```s
java -jar XXX.jar &
```

3、使用这种方式运行的程序日志会输出到当前目录下的nohup.out文件，使用ctrl+c中断或者关闭窗口都不会中断程序的执行。
```s
nohup java -jar XXX.jar &
```

4、查看jar包进程：
```s
ps aux|grep getCimiss-surf.jar
```
5、杀死运行进程命令
```s
kill -9 30768
```
## 编写shell脚本操作开启和关闭

### start.sh
```shell
nohup java -jar xxx.jar --server.port=8082 &
```
### stop.sh
```shell
PID=$(ps -ef |grep  xxx.jar | grep -v grep | awk '{ print $2 }')
if [ -z "$PID" ]
then
    echo Application is already stopped
else
    echo kill $PID
    kill $PID
fi
```
