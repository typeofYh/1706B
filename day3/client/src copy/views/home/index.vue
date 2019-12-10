<template>
    <div>
        <input v-model="val" /><button @click="search">搜索</button>
        <nav>
            <ul>
                <li v-for="(val,i) in navdata" :key="i" @click="change(i)" :class="{
                    active:curindex === i
                }">{{val.title}}<b v-if="val.num">{{val.num}}</b></li>
            </ul>
        </nav>
        <div>
            <ul>
                <li v-for="(val,i) in resdata" :key="i">{{val.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            val:'',
            navdata:[
                {
                    title:'云近货商',
                    num:'',
                    type:'buyer'
                },
                {
                    title:'全部',
                    num:'',
                    type:'all'
                },
                {
                    title:'关注用户',
                    num:'',
                    type:'like'
                },
                {
                    title:'成交',
                    num:'',
                    type:'ok'
                }
            ],
            resdata:[],  //展示数据
            alldata:[],  //全部数据
            curindex:0  //控制类名
        }
    },
    async mounted(){
        //获取所有的数据
        let data = await axios.get('/api/list');
        this.alldata = data.data.data;
        this.setNavdata(this.alldata);
        this.setResdata(this.navdata[this.curindex].type); //设置展示数据
    },
    methods:{
        setNavdata(data){
            this.navdata = this.navdata.map(item=>{
                if(item.type === 'all'){
                    item.num = data.length
                }else{
                    item.num = data.reduce((prev,val)=>{
                        prev += (val.type === item.type ? 1 : 0);
                        return prev;
                    },0)
                }
                return item;
            })
        },
        setResdata(type){
            if(type === 'all'){
                this.resdata = this.alldata;
            }else{
                this.resdata = this.alldata.filter(item=>item.type === type);
            }
        },
        change(i){
            this.curindex = i;
            this.setResdata(this.navdata[i].type);
        },
        search(){
            if(this.val){
                axios.post('/api/search',{
                    val:this.val
                }).then(res=>{
                    this.resdata = res.data.data;
                })
            }else{
                alert('请输入')
            }
        }
    }
}
</script>
<style scoped  lang="scss">
.active{
    color:red;
}
</style>