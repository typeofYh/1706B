import request from '@/utils/request'


export const getUserInfo = ()=>request.get('/getuserinfo',{
    headers:{
        token:window.localStorage.getItem('token')
    }
})