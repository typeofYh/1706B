import Loadable from 'react-loadable';
import React from 'react';
const Loading = ()=><div>loading...</div>

const homeChildren = [
    {
        path:'/home',
        redirect:'/home/index'
    },
    {
        path:'/home/index',
        meta:{
            title:'首页',
            icon:'xitongguanli'
        },
        component:Loadable({
            loader:()=>import('@/views/Home/children/Index'),
            loading:Loading
        })
    },
    {
        path:'/home/submit',
        meta:{
            title:'留言',
            icon:'daochu'
        },
        component:Loadable({
            loader:()=>import('@/views/Home/children/Submit'),
            loading:Loading
        })
    },
    {
        path:'/home/my',
        meta:{
            title:'我的',
            icon:'gerenzhongxin'
        },
        component:Loadable({
            loader:()=>import('@/views/Home/children/My'),
            loading:Loading
        })
    }
]

export const getNavdata = ()=>{
    return homeChildren.filter(item=>!item.redirect).map(item=>{
        return {
            title:item.meta.title,
            icon:item.meta.icon,
            path:item.path
        }
    })
}
export default homeChildren;