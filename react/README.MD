# React编译模块说明

## 1. 用途
对项目中个别React功能提供支持

## 2. 用法
在modules中编写对应的子模块，然后在webpack.config.js中添加进去后，就可以直接在目录下用webpack命令编译了。
- 普通：webpack[Enter]
- 压缩：webpack -p [Enter]
- 自动检查文件变化：webpack -w [Enter]
- 压缩+自动检查文件变化：webpack -w -p [Enter]

## 3. 目录文件说明
|目录|文件|说明|
|----|----|----|
|modules|*|自己编写的react模块|
|node_modules|*|react系统所需的库文件|
|.|package.jscon|NPM或者别的配置文件？忘了|
|.|standard-react-template.html|默认的html模板，忘记写了可以用这个|
|.|webpack.config.js|webopack的配置文件|
