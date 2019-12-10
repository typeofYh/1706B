const Koa = require('koa');
const app = new Koa();
const static = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const rootRouter = new Router();
const fs = require('fs');
app.use(static(
    path.join(__dirname,'public')
));

app.use(bodyParser());


rootRouter.get('/list',async ctx=>{
    let data = JSON.parse(fs.readFileSync('./data/data.json','utf8')).data
    data.sort((a,b)=>b.sum-a.sum);
    // console.log(data);
    ctx.body = {
        code:1,
        msg:'success',
        data
    }
})
rootRouter.get('/detail',async ctx=>{
    let data = JSON.parse(fs.readFileSync('./data/data.json','utf8')).data
    let id = ctx.request.query.id;
    ctx.body = {
        code:1,
        msg:'success',
        data:data.find(item=>item.id==id)
    }
})

rootRouter.post('/submit',async ctx=>{
    let {n,id} = ctx.request.body; 
    let data = JSON.parse(fs.readFileSync('./data/data.json','utf8')).data
    let item = data.find(item=>item.id==id);
    item.sum = item.sum ? (item.sum + n) : n;
    fs.writeFileSync('./data/data.json',JSON.stringify({data}));
    ctx.body = {
        code:1,
        msg:'success'
    }
})

app.use(rootRouter.routes(),rootRouter.allowedMethods());

app.listen('3000');