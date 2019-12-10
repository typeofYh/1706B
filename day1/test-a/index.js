#!/usr/bin/env node

//1. 获取命令行参数
// console.log(process.argv);

//2. 获取运行指令位置

// console.log(process.cwd());

const commander = require('commander'); //监听process.argv 的参数 根据做出不同的判断
let pathname = process.cwd();
const fs = require('fs');
const path = require('path');
//3. 创建文件或文件夹


commander.version(require('./package.json').version);
commander.option('-f,--file <a>','要创建的文件名');
commander.option('-d,--dir <a>','要创建的文件夹');

commander.parse(process.argv);  //格式话命令行参数

// console.log(commander.file);
if(commander.file){
    const filepath = path.join(pathname,commander.file);
    fs.writeFileSync(filepath,'');
}

if(commander.dir){
    const filepath = path.join(pathname,commander.dir);
    fs.mkdirSync(filepath);
}