import Loadable from 'react-loadable';
import React from 'react';
import homechildren from './home.config'
const Loading = ()=><div>loading...</div>

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        meta:{
            title:'登陆'
        },
        component:Loadable({
            loader:()=>import('@/views/Login'),
            loading:Loading
        })
    },
    {
        path:'/registry',
        meta:{
            title:'注册'
        },
        component:Loadable({
            loader:()=>import('@/views/Registry'),
            loading:Loading
        })
    },
    {
        path:'/home',
        meta:{
            title:'首页'
        },
        component:Loadable({
            loader:()=>import('@/views/Home'),
            loading:Loading
        }),
        children:[
            ...homechildren
        ]
    }
]

export default routes;