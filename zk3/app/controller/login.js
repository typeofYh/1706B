const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class Login extends Controller{
    async index(){
        let {username,password} = this.ctx.request.body
        let data = await this.service.login.index(username,password);
        if(data.code){
            let token = jwt.sign({
                username,
                password,
                uid:data.id,
                identity:data.identity,
                identityName:data.identityName
            },this.config.keys,{
                expiresIn:'2h'
            })
            this.ctx.body = {
                code:1,
                msg:'scucces',
                data:{
                    token
                }
            }
            return ;
        }
        this.ctx.body = data;
    }
    async getuserinfo(){
        console.log('getuserinfo');
        this.ctx.body = {
            code:1,
            msg:'success',
            data:this.ctx.userinfo
        }
    }
}



module.exports = Login;