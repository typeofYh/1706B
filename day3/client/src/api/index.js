import request from '@/utils/request'
export const getlist = ()=>request.get('/list');
export const getDetail = (id)=>request.get('/detail',{
    params:{
        id
    }
});

export const getTotal = (n)=>request.post('/submit',{
    ...n
})


export default {
    install(Vue){
        Vue.prototype.$api = {
            getlist,
            getDetail,
            getTotal
        }
    }
}