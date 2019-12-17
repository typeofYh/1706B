const jwt = require('jsonwebtoken');
module.exports = () =>async (ctx,next)=>{ 
    let authority = ctx.get('authority');
    let {whiteList} = ctx.app.config;
    //白名单出现的不校验
    if(whiteList.find(item=>item.method===ctx.request.method&&item.path===ctx.request.path)){
        await next();
        return;
    }
    try{
        let res = jwt.verify(authority,ctx.app.config.keys);
        ctx.userinfo = res;
        await next();
    }catch(error){
        ctx.status = 401;
        ctx.body = {
            code:0,
            msg:'用户信息已失效或用户信息被篡改'
        }
    }
    
}