const Service = require('egg').Service;


module.exports = class extends Service{
    async index(username,password){
        let data = await this.app.mysql.get("user",{
            username,
            password
        })
        if(data){
            let identityName = await this.app.mysql.get('identity',{
                id:data.identity
            })
            return {
                code:1,
                msg:"登陆成功",
                ...data,
                identityName
            }
        }
        return {
            code:0,
            msg:"账号密码错误"
        }
    }
}