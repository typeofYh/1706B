import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);


const route = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/list',
            component:()=>import('@/view/list/index.vue')
        },
        {
            path:'/submit/:id',
            component:()=>import('@/view/submit/index.vue')
        }
    ]
})

export default route;