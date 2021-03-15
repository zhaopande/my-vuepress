(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{258:function(o,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},(function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[a("blockquote",[a("p",[o._v("os：win10-64bit")]),o._v(" "),a("p",[o._v("mongodb-version：4.2.2")])]),o._v(" "),a("h3",{attrs:{id:"_1、下载安装包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、下载安装包"}},[o._v("*")]),o._v(" 1、下载安装包")]),o._v(" "),a("p",[o._v("去官网根据自己的系统下载安装包"),a("a",{attrs:{href:"https://www.mongodb.com/download-center/community",target:"_blank",rel:"noopener noreferrer"}},[o._v("https://www.mongodb.com/download-center/community"),a("OutboundLink")],1),o._v(",有"),a("code",[o._v("msi安装程序")]),o._v("和"),a("code",[o._v("zip包")]),o._v("两种，这里下载的是前者。\n"),a("img",{attrs:{src:"/img/mongodb/download.png",alt:"dowmload"}})]),o._v(" "),a("h3",{attrs:{id:"_2、安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、安装"}},[o._v("*")]),o._v(" 2、安装")]),o._v(" "),a("p",[o._v("双击"),a("code",[o._v("mongodb-win32-x86_64-2012plus-4.2.2-signed.msi")]),o._v("安装程序\n"),a("img",{attrs:{src:"/img/mongodb/setup.png",alt:"dowmload"}})]),o._v(" "),a("p",[o._v("点击"),a("code",[o._v("next")]),o._v("后选择"),a("code",[o._v("custom")]),o._v("自定义配置")]),o._v(" "),a("p",[a("img",{attrs:{src:"/img/mongodb/custom.png",alt:"dowmload"}})]),o._v(" "),a("p",[o._v("这个地方其实是可以配置安装路径的")]),o._v(" "),a("blockquote",[a("p",[o._v("不过我已经安装过了，所以不用选择")])]),o._v(" "),a("p",[a("img",{attrs:{src:"/img/mongodb/custom-setup.png",alt:"dowmload"}})]),o._v(" "),a("p",[o._v("服务配置默认选择就好")]),o._v(" "),a("p",[a("img",{attrs:{src:"/img/mongodb/serviceConf.png",alt:"dowmload"}})]),o._v(" "),a("p",[o._v("然后的操作一路next就ok了")]),o._v(" "),a("h3",{attrs:{id:"_3、配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、配置"}},[o._v("*")]),o._v(" 3、配置")]),o._v(" "),a("p",[o._v("打开安装目录")]),o._v(" "),a("ul",[a("li",[o._v("在"),a("code",[o._v("data")]),o._v("文件夹下新建"),a("code",[o._v("db")]),o._v("文件夹，用以存放数据")]),o._v(" "),a("li",[o._v("在"),a("code",[o._v("data")]),o._v("文件夹下再创建"),a("code",[o._v("log")]),o._v("文件夹，然后新建"),a("code",[o._v("mongod.log")]),o._v("文件，用以存放日志信息")])]),o._v(" "),a("p",[o._v("上述步骤完成后，打开bin文件夹下的配置文件"),a("code",[o._v("mongod.cfg")]),o._v("，修改storage下的"),a("code",[o._v("dbpath")]),o._v("和systemLog下的"),a("code",[o._v("path")]),o._v("，分别配置刚才的新建好的文件夹的绝对路径")]),o._v(" "),a("div",{staticClass:"language-cfg extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[o._v("storage:\n  dbPath: F:\\software\\mongoDB\\data\\db  //数据文件  此处=后对应到数据所存放的目录\n  journal:\n    enabled: true    //启用日志文件，默认启用\n#  engine:\n#  mmapv1:\n#  wiredTiger:\n\n# where to write logging data.\nsystemLog:\n  destination: file\n  logAppend: true //错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件\n  path:  F:\\software\\mongoDB\\data\\log\\mongod.log  //日志文件  此处=后对应到日志文件所在路径\n")])])]),a("h3",{attrs:{id:"_4、安装服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、安装服务"}},[o._v("*")]),o._v(" 4、安装服务")]),o._v(" "),a("p",[o._v("配置完成后用管理员身份启动cmd或者powershell，用命令进入安装目录下的bin文件夹")]),o._v(" "),a("div",{staticClass:"language-cfg extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[o._v('`mongod --logpath "F:\\software\\mongoDB\\data\\log\\mongodb.log" --logappend --dbpath "F:\\software\\mongoDB\\data\\db" --serviceName "MongoDB" --install`\n')])])]),a("h3",{attrs:{id:"_5、启动mongodb服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、启动mongodb服务"}},[o._v("*")]),o._v(" 5、启动mongodb服务")]),o._v(" "),a("p",[o._v("直接进入安装目录下的bin文件夹，找到"),a("code",[o._v("mongo.exe")]),o._v("，点击运行")]),o._v(" "),a("p",[a("img",{attrs:{src:"/img/mongodb/runserver.png",alt:"runserver"}})]),o._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[o._v("需配置换环境变量")]),o._v(" "),a("p",[o._v("也可以使用命令"),a("code",[o._v("net start mongodb")]),o._v("来启动，")]),o._v(" "),a("p",[o._v("首次启动失败先删除服务,使用命令\n"),a("code",[o._v("sc delete MongoDB")])])]),o._v(" "),a("h3",{attrs:{id:"结语"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结语"}},[o._v("*")]),o._v(" 结语")]),o._v(" "),a("p",[o._v("至此已经可以成功运行服务了，其实还可以配置换环境变量，用以命令操作更方便，直接把安装目录下的"),a("code",[o._v("bin")]),o._v("文件夹绝对路径复制到系统变量"),a("code",[o._v("path")]),o._v("中即可，和配置其他开发环境时的套路一样，这个太过简单就不做介绍了")])])}),[],!1,null,null,null);t.default=n.exports}}]);