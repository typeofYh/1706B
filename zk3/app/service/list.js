const Service = require('egg').Service;

class List extends Service{
    getPageData(alldata,limit,offset){
        return alldata.slice(offset,offset+limit);
    }
    async getList(rule){
        let where = {};
        if(rule.userid !== 'all'){
            where.userid = rule.userid;
        }
        //where空对象查询所有数据  
        let alldata = await this.app.mysql.select('exam',{
            where
        })
        //所有的用户数据
        let userinfo = await this.app.mysql.select('user');
        //[{},{}]
        alldata.map(item=>{
            //设置username字段用户名
            item.username = userinfo.find(val=>val.id===item.userid).username;
            //设置平均成绩
            item.num = (item.textNum + item.codeNum) / 2;
        })
        // let data = await this.app.mysql.select('exam',{
        //     where,
        //     limit:rule.limit*1,
        //     offset:(rule.pageid*1-1)*rule.limit
        // });
        return {
            data:this.getPageData(alldata,rule.limit*1,(rule.pageid*1-1)*rule.limit),
            pageSize:Math.ceil(alldata.length / rule.limit)
        };
    }
}

module.exports = List;