#! /usr/bin/env node

const Koa = require('koa');

const app = new Koa();

const comander = require('commander');
const {exec} = require('child_process');
const fs = require('fs');
const rootPath = process.cwd();
const inquirer = require('inquirer');
const static = require('koa-static');
const path = require('path');

comander.version(require('../package.json').version);
comander.option("-p, --port <port>",'请输入端口号');
comander.parse(process.argv);

const PORT = comander.port || 8000;

app.use(static(rootPath)); //static 处理文件

app.use(async (ctx,next)=>{ //文件夹
    ///day1
    let url = decodeURI(ctx.request.url);
    let data = fs.readdirSync(path.join(rootPath,url));
    ctx.body = `<ul>
        ${
            data.map(item=>`<li><a href="${path.join(url,item)}">${item}</a></li>`).join('')
        }
    </ul>`
})

app.listen(PORT,()=>{
    console.log(`Running at http://localhost:${PORT}`);
    //自动打开浏览器（进程）
    exec(`start http://localhost:${PORT}`);
});