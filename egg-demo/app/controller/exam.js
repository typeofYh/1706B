const {Controller} = require('egg');

module.exports = class extends Controller{
    async submit(){
        try{
            await this.app.mysql.insert('exam',{
                userid:this.ctx.userinfo.id,
                ...this.ctx.request.body
            });
            this.ctx.body = {
                code:1,
                msg:'success'
            }
        }catch(error){
            this.ctx.body = {
                code:0,
                msg:'error'
            }
        }
    }
}