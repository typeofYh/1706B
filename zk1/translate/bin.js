const superament = require('superagent');
const inquirer = require('inquirer');

const promptList = [
    // 具体交互内容
    {
        type: 'input',
        message: '请输入单词:',
        name: 'keyword',
        default: "" // 默认值
    }
];

inquirer.prompt(promptList).then(answers => {
    superament.get('http://fanyi.youdao.com/openapi.do')
        .query({
            keyfrom:'toaijf',
            key:'868480929',
            type:'data',
            doctype:'json',
            version:'1.1',
            q:answers.keyword
        })
        .end((err,res)=>{
            console.log(answers.keyword)
            console.log(res.body.translation.join(''));
        })
})

