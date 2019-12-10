<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id" @click="toSubmit(item.id)">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        this.$api.getlist().then(res=>{
            this.list = res.data;
        })
    },
    methods:{
        toSubmit(id){
            this.$router.push('/submit/'+id);
        }
    }
}
</script>
<style scoped  lang="">

</style>