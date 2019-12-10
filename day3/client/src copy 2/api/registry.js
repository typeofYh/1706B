import request from '@/utils/request';


export const getIdentity = ()=>request.get('/identity');


export const sendUserInfo = (data)=>request.post('/registry',data);




