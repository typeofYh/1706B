const http = require('http');
class Koa{
    // middleware = []
    constructor(){
        this.middleware = [];
        this._init = 0;
        this._req = {};
        this._res = {};
    }
    use(callback){  //挂载中间件
        this.middleware.push(callback);
    }
    linsten(){ //派发这些中间件
        // console.log(this.middleware);
        this.middleware[this._init] && this.middleware[this._init](this._req,this._res,()=>{
            this._init++;
            this.linsten()
        })
    }
}

const app = new Koa();


app.use(async (req,res,next)=>{
    console.log(1)
    next(); //_init++
    console.log(2)
})

app.use(async (req,res,next)=>{
    setTimeout(function(){
        console.log(3)
        next()
        console.log(4)
    },100)
})

app.use(async (req,res,next)=>{
    console.log(5)
})


app.linsten(3000)



