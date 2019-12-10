import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js.js'
import api from '@/api'

Vue.use(api);

new Vue({
    el:'#app',
    render:(h)=>h(App),
    router
})