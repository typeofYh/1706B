<template>
    <el-container class="index">
        <el-aside width="200px">
            <div class="logo">
                <img src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=31ae4c2cac611321b2816410a594ec94&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F9f5b6ac2d5628535ddc0f85898ef76c6a7ef63b5.jpg" />
            </div>
            <el-menu class="menu">
                <el-menu-item v-for="(item,i) in viewsList" :key="i">{{item.title}}</el-menu-item>
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
            this.viewsList = data.viewList;
            // console.log(data);
        }).catch(error=>{
            alert(error.response.data.msg);
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