const configList = [
    {
        title:'学生',
        views:[
            {
                name:'submit',
                title:'提交成绩'
            },
            {
                name:'show',
                title:'展示成绩'
            }
        ]
    },
    {
        title:'老师',
        views:[
            {
                name:'show',
                title:'展示成绩'
            }
        ]
    }
]

const findViews = (identityTitle)=>{
    return configList.find(item=>item.title === identityTitle);
}

module.exports = {
    findViews
}