import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import api from '@/api/index'

Vue.use(api);

new Vue({
    el:'#app',
    render:(h)=>h(App),
    router
})