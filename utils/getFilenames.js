/**
 * 获取一个目录下的所有文件名
 * 使用方法：var filehelper = require('./getfileArr.js')
 * filehelper.getFileName("/Users/fangzheng/JavaDev/blog/docs/BigData/Flume/")
 */

const fs = require('fs');  
// 排除检查的文件
var excludes = ['.DS_Store']   

var filehelper = {
    getFileName: function (rpath, reademeName) {
        console.log("rpath:==", rpath.split("\\")[rpath.split("\\").length - 2]);
        let fileArr = [];

        fs.readdirSync(rpath).forEach(file => {
            let singleFileInfo = [];
            if (excludes.indexOf(file) < 0) {
                fullpath = rpath + "/" + file
                var fileinfo = fs.statSync(fullpath)
                if (fileinfo.isFile()) {
                    if (file === 'README.md') {
                        singleFileInfo.push("");
                        singleFileInfo.push(reademeName || "前言");//reademe用前言代替
                    } else {
                        file = file.replace('.md', '');
                        singleFileInfo.push(file);
                        singleFileInfo.push(file);//文件名
                    }
                    // console.log("file");
                    // console.log(file);

                    fileArr.push(singleFileInfo);
                }
            }
        })
        // console.log("fileArr:",fileArr)
        fileArr.sort(); // 排序
        return fileArr;
    }
}
module.exports = filehelper;