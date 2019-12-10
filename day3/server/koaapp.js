const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const getData = (path)=>new Promise((resolve,reject)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            reject(err)
            return ;
        }
        resolve(JSON.parse(data.toString()));
    })
})


app.use(bodyParser());

app.use(router.routes(),router.allowedMethods());

router.post('/search',async (ctx,next)=>{
    let {val} = ctx.request.body;
    let data = await getData('./data/data.json'); 
    ctx.body = {
        code:1,
        mes:'success',
        data:data.filter(item=>{
            return item.phone.includes(val) || item.name.includes(val) || item.title.includes(val)
        })
    };
})

router.get('/list',async (ctx,next)=>{
    let {res} = ctx;
    let data = await getData('./data/data.json'); 
    // console.log(res,data);
    ctx.body = {
        code:1,
        mes:'success',
        data
    }
})



app.listen(3000);