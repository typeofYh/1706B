import request from '@/utils/request'


export const getUserInfo = ()=>request.get('/getuserinfo',{
    headers:{
        token:window.localStorage.getItem('token')
    }
})


export const submitExam = (data)=>request.post('/submitexam',data,{
    headers:{
        token:window.localStorage.getItem('token')
    }
});


export const searchExam = ()=>request.get('/searchexam',{
    headers:{
        token:window.localStorage.getItem('token')
    }
})


export const getAg = ()=>request.get('/getag',{
    headers:{
        token:window.localStorage.getItem('token')
    }
});