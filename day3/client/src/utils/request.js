import axios from 'axios';

const request = axios.create({
    baseURL:'/api'
})


request.interceptors.request.use(function(config){
    return {
        ...config,
        headers:{
            ...config.headers,
            token:window.localStorage.getItem('token')
        }
    }
},function(error){
    return Promise.reject(error);
})


request.interceptors.response.use(function(response){
    return response.data;
},function(error){
    return Promise.reject(error);
})


export default request;