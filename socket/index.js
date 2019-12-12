const WebSocket = require('ws');
const http = require('http')
const fs = require('fs');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end(fs.readFileSync('./index.html'));
    }
});

const ws = new WebSocket.Server({server});
const questionData = require('./data.json');
ws.on('connection',(item)=>{
    //接受浏览器传递消息
    item.on('message',(data)=>{
        //data 是浏览器发送内容
        data = JSON.parse(data);
        //data.type question -》 提问 cont 提问内容
        if(data.type === 'question'){
            let question = data.cont; //提问内容
            //questionData 所有的提问数据
            let res = questionData.filter(v=>{
                let keys = v.keys.filter(val=>{
                    return question.includes(val)
                });
                return keys.length > 0;
            })
            //有没有相关问题
            if(res.length){
                //返回答案
                item.send(JSON.stringify({
                    type:'success',
                    msg:res[0].answer
                }))
            }else{
                //没有答案
                item.send(JSON.stringify({
                    type:'error',
                    msg:'听不懂你在说什么...'
                }))
            }
        }
    })
})

server.listen(3000);