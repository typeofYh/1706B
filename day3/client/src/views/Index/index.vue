<template>
    <el-container class="index">
        <el-aside width="200px">
            <div class="logo">
                <img :src="require('@/assets/images/timg.jpg')" />
            </div>
            <el-menu class="menu">
                <el-menu-item v-for="(item,i) in viewsList" :key="i"><router-link :to="item.name">{{item.title}}</router-link></el-menu-item>
            </el-menu>
        </el-aside>
        <el-main >
            <el-header>
                <p class="userinfo">{{identityTitle}}:{{username}}</p>
            </el-header>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
import {getUserInfo} from '@/api/info'
export default {
    data(){
        return {
            username:'',
            identityTitle:'',
            viewsList:[]
        }
    },
    created(){
        getUserInfo().then(({data})=>{
            this.username = data.username;
            this.identityTitle = data.userIdentityTitle;
            this.viewsList = data.viewList;  //视图权限列表
        }).catch(error=>{
            console.log(error);
            window.localStorage.removeItem('token');
            this.$router.replace('/login');
        })
    }
}
</script>
<style scoped  lang="scss">
.index{
    height: 100%;
    width:100%;
}
.header{
    height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #2f5f83;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .userinfo{
      float: right;
  }
  .menu{
      li{
          background: #2f5f83;
          border:none;
          border-left:2px solid #0d273a;
          color:#fff;
      }
  }
</style>