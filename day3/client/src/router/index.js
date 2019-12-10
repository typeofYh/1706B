import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);  //router-link  router-view

const routes = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect:'/index/home'
        },
        {
            path:'/index',
            beforeEnter(to,from,next){
                let token = window.localStorage.getItem('token'); 
                if(token && token.split('.').length === 3){
                    next();
                }else{
                    routes.replace('/login');
                }
            },
            component:()=>import('@/views/Index/index.vue'),
            children:[
                {
                    path:'home',
                    component:()=>import('@/views/Index/components/index.vue')
                },
                {
                    path:'/index',
                    redirect:'/index/home'
                }
            ]
        },
        {
            path:'/login',
            component:()=>import('@/views/Login/index.vue')
        },
        {
            path:'/registry',
            component:()=>import('@/views/Registry/index.vue')
        }
    ]
})


export default routes;