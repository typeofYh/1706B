<template>
    <el-container>
        <el-form :model="userinfo" :rules="userRule" ref="myform">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userinfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">登陆</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
import {login} from '@/api/login'
export default {
    data(){
        return {
            userinfo:{
                username:'',
                password:'',
            },
            userRule:{
                username:[
                    {
                        required: true, message: '请输入姓名', trigger: 'change' 
                    }
                ],
                password:[
                    {
                        required: true, message: '请输入密码', trigger: 'change'
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        submit(){
            this.$refs['myform'].validate((res)=>{
                if(res){
                    //发ajax请求提交数据
                    login(this.userinfo).then(res=>{
                        if(res.data.code){
                            //登陆chengg
                            window.localStorage.setItem('token',res.data.data.token);
                            this.$router.push('/index');
                        }else{
                            alert(res.data.msg);
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