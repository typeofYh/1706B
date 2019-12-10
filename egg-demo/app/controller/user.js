const Controller = require('egg').Controller;
const uid = require('uid');
const jwt = require('jsonwebtoken'); //sign
const {findViews} = require('../../config/view.config')
module.exports = class extends Controller{
    async index(ctx){
        let {request} = ctx;
        //database 
        //通过校验 向数据库存储
        // let query = `INSERT INTO user (${Object.keys(request.body).join(',')},id) values("${Object.values(request.body).join('","')}","${uid(10)}")`;
        // this.app.mysql.query(query);

        await this.app.mysql.insert("user",{
            ...request.body,
            id:uid(10)
        })

        ctx.body = {
            code:1,
            msg:'注册成功'
        }
    }
    async getIdntity(){ //查询表
        let data = await this.app.mysql.select('identity');
        this.ctx.body = {
            msg:'success',
            code:1,
            data:[...data]
        }
    }
    async login(){
        let {password,username} = this.ctx.request.body;
        let data = await this.app.mysql.get('user',{
            username,
            password
        });
        if(data){
            delete data.password;
            this.ctx.body = {
                code:1,
                msg:'登陆成功',
                data:{
                    token:jwt.sign({...data},this.app.config.keys,{expiresIn:'1h'})
                }
            }
            return ;
        }
        this.ctx.body = {
            code:0,
            msg:'用户名密码输入有误'
        }
    }
    async getuserinfo(){
        let token = this.ctx.get('token');
        try{
            let userinfo = jwt.verify(token,this.app.config.keys);
            let title = await this.app.mysql.get('identity',{
                id:userinfo.identity
            })
            userinfo.userIdentityTitle = title.title;
            //动态设置用户权限视图
            userinfo.viewList = findViews(title.title).views;
            this.ctx.status = 200;
            this.ctx.body = userinfo;
        }catch(error){
            this.ctx.status = 401;
            this.ctx.body = {
                code:0,
                msg:'用户登陆超时或用户信息错误，可能信息被篡改'
            }
        }
        
    }
}