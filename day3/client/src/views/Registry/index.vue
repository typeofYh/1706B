<template>
    <el-container>
        <el-form :model="userinfo" :rules="userRule" ref="myform">
            <el-form-item label="身份" prop="identity">
                <el-select v-model="userinfo.identity"  placeholder="请选择身份">
                    <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.title">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="usercode" v-if="userinfo.identity==='abc123'">
                <el-input v-model="userinfo.usercode"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userinfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
import {getIdentity,sendUserInfo} from '@/api/registry'
export default {
    data(){
        return {
            userinfo:{
                username:'',
                password:'',
                usercode:'',
                identity:''
            },
            userRule:{
                username:[
                    {
                        required: true, message: '请输入姓名', trigger: 'change' 
                    }
                ],
                usercode:[
                    {
                        required: true, message: '请输入学号', trigger: 'change' 
                    }
                ],
                password:[
                    {
                        required: true, message: '请输入密码', trigger: 'change'
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }
                ],
                identity:[
                    {
                        required: true, message: '请选择身份', trigger: 'change'
                    }
                ]
            },
            options:[]
        }
    },
    mounted(){
        window.aa = this;
        getIdentity().then(({data})=>{
            this.options = data.data;
            this.userinfo.identity = this.options[0].id;
        })
    },
    methods:{
        submit(){
            this.$refs['myform'].validate((res)=>{
                if(res){
                    //发ajax请求提交数据
                    sendUserInfo(this.userinfo).then(res=>{
                        // console.log(res);
                        if(res.data.code){
                            this.$message({
                                message:res.data.msg,
                                type:'success'
                            });
                            this.$router.push('/login');
                        }
                    })
                    return;
                }

            })
        }
    }
}
</script>
<style scoped  lang="">

</style>