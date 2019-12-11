const {Controller} = require('egg');

module.exports = class extends Controller{
    async submit(){
        try{
            let res = await this.app.mysql.get('exam',{
                userid:this.ctx.userinfo.id,
                date:this.ctx.request.body.date
            })
            if(res){ //提交过
                await this.app.mysql.update('exam',{
                    id:res.id,
                    ...this.ctx.request.body
                });
            }else{ //
                await this.app.mysql.insert('exam',{
                    userid:this.ctx.userinfo.id,
                    ...this.ctx.request.body
                });
            }
            this.ctx.body = {
                code:1,
                msg:'success'
            }
        }catch(error){
            console.log(error);
            this.ctx.body = {
                code:0,
                msg:'error'
            }
        }
    }
    async search(){
        let {userIdentityTitle,id}  = this.ctx.userinfo
        let data = null;
        if(userIdentityTitle === '学生'){
            data = await this.app.mysql.select('exam',{
                where:{
                    userid:id
                }
            })
        }else{
            let user = await this.app.mysql.select('user');
            data = await this.app.mysql.select('exam')
            data = data.map(item=>{
                item.username = user.find(val=>val.id===item.userid).username;
                return item;
            })
        }
        this.ctx.body = {
            code:1,
            msg:'success',
            data:[...data]
        }
    }
}