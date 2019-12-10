const inquirer = require('inquirer');

const promptList = [
    // 具体交互内容
    {
        type:'list',
        message: '请选择工具下载：',
        name: 'down',
        choices:[
            'npm',
            'yarn',
            'cnpm'
        ]
    }
];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})