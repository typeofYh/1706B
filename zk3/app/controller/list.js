const Controller = require('egg').Controller;

class List extends Controller{
    async getList(){
        let {identityName:{title:identityTitle},uid} = this.ctx.userinfo;
          //identityName：title
        //1.根据userinfo判断身份 
        //1.1 老师 读取全部数据只做分页
        //1.2 学生 读取自己的数据做分页
        let rule = {
            ...this.ctx.query
        };
        if(identityTitle === '老师'){
            rule.userid = 'all';
        }else{
            rule.userid = uid;
        }
        try{
            let res = await this.service.list.getList(rule);
            this.ctx.body = {
                code:1,
                msg:'success',
                data:res
            }
        }catch(error){
            this.ctx.body = {
                code:0,
                msg:'error',
                data:error
            }
        }
        
    }
}

module.exports = List;