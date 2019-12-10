import Vue from 'vue';
import App from './App'
import router from './router'
import '@/config/element.config.js'
import '@/assets/css/common.scss'
new Vue({
    el:'#app',
    router,
    render:(h)=>h(App)
})