#### node

解析ECMAscript的一个平台



#### npm
npm是一包（目录）管理工具

```
|--package.json //包描述文件
|--|--main:入口文件 **
|--|--name:包名
|--|--version:版本号
|--|--description:项目描述
|--|--dependencies:正式环境依赖 **
|--|--devDependencies:开发环境依赖 **
|--|--scripts:自定义指令 npm run 指令名 npm start（这个指令可以省略run） **
|--|--engines:检测版本
|--|--repository:仓库
|--|--author:作者
|--|--license:监听协议
|--|--bin 声明命令行程序字段 **
|--README.md  //包说明文件
```

#### 常用指令

```
npm i -> npm install (-g|--global -S|--save -D|--dev-save)

npm root -g //全局安装位置

npm config list //查看npm配置列表
cache 下载缓存
prefix 全局安装地址
registry 下载源地址

npm config set cache|prefix|registry 

npm view 包名 //查看包信息

npm version //查看npm版本号

```

此电脑右击-》属性-》高级系统设置-》环境变量-》Path


#### 命令行程序

cli （command-line interface） 图形用户界面得到普及之前使用最为广泛的用户界面，它通常不支持鼠标，用户通过键盘输入指令，计算机接收到指令后，予以执行。也有人称之为字符用户界面（CUI）

1. 建文件夹
2. 生成package.json
3. 添加bin字段
```
{
    "要执行的指令":"要执行的文件"
}
```
4. 告诉计算机用什么解析这个文件 #!/usr/bin/env node 
5. npm install -g 全局安装当前包
6. 运行该指令



#### process

process 是node中的全局进程对象，全局变量可以直接使用，

- process.argv 
功能：获取命令行参数 
返回值：数组[node程序安装位置，当前运行文件位置，参数1，参数2...]

- process.cwd()
功能：获取进程运行位置
返回值: 字符串

