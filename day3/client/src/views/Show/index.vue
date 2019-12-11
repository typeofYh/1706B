<template>
    <div>
        <el-table
        :data="tableData"
        :stripe="true"
        :border="true"
        style="width: 100%"
        :header-row-style="{
            height:'100px'
        }">
            <el-table-column
            label="日期"
            width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ new Date(scope.row.date).toLocaleDateString() }}</span>
                </template>
            </el-table-column>
            <el-table-column
            v-if="usernameOpen"
            label="姓名"
            width="180">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            label="理论成绩"
            width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.textNum}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="技能成绩"
            width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.codeNum}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="buttonOpen">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {searchExam,getUserInfo} from '@/api/info'
export default {
   data() {
      return {
        tableData: [],
        buttonOpen:false,
        usernameOpen:false
      }
    },
    created(){
        getUserInfo().then(({data})=>{
            if(data.userIdentityTitle === '学生'){
                this.buttonOpen = true;
            }
        })
        searchExam().then(res=>{
            this.tableData=res.data.data;
            if(this.tableData[0].username){
                this.usernameOpen = true;
            }
        })
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
  
}
</script>
<style scoped  lang="">

</style>