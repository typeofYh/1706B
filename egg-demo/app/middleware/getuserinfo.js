const jwt = require('jsonwebtoken');
const {findViews} = require('../../config/view.config')
module.exports = (app)=>async function(ctx,next){
    let token = ctx.get('token');
    try{
        // console.log('keys',token,ctx.app.config.keys);
        let userinfo = jwt.verify(token,ctx.app.config.keys);
        // console.log(userinfo);
        let title = await ctx.app.mysql.get('identity',{
            id:userinfo.identity
        })
        userinfo.userIdentityTitle = title.title;
        //动态设置用户权限视图
        userinfo.viewList = findViews(title.title).views;
        ctx.status = 200;
        ctx.userinfo = userinfo;
        await next();
    }catch(error){
        ctx.status = 401;
        ctx.body = {
            code:0,
            msg:'用户登陆超时或用户信息错误，可能信息被篡改'
        }
    }
    
}