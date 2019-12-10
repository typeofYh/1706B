
export const viewList =  [
    {
        path:'/index/submit',
        meta:{
            title:'提交成绩',
            isAside:true,
            name:'submit'
        },
        component:()=>import('@/views/Submit/index.vue')
    },
    {
        path:'/index/show',
        meta:{
            title:'查看成绩',
            isAside:true,
            name:'show'
        },
        component:()=>import('@/views/Show/index.vue')
    }
]


// export const findViewList = (arr)=>{  //
//     //arr 该用用户拥有的权限
//     router.addRoutes(viewList.filter(item=>{
//         let res = arr.find(val=>val.name === item.meta.name);
//         return res && item.meta.isAside;
//     }))
// }