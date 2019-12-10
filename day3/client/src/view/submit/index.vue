<template>
    <div>
        <p>您在多大程度上愿意向您的亲朋好友推荐</p>
        <p><b>{{title}}</b>产品/服务</p>
        <img :src="'http://localhost:3000'+src" alt="" />
        <ul>
            <li v-for="item in 10" :key="item" @click="submit(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>

export default {
    data(){
        return {
            title:'',
            src:''
        }
    },
    created(){
        this.$api.getDetail(this.$route.params.id).then(res=>{
            this.title = res.data.title;
            this.src = res.data.pic;
        })
    },
    methods:{
        submit(n){
            this.$api.getTotal({
                n,
                id:this.$route.params.id
            }).then(res=>{
                console.log(res);
            })
        }   
    }
}
</script>
<style scoped  lang="">

</style>