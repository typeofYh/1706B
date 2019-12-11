<template>
    <div>
        <el-form>
            <el-form-item label="理论成绩">
                <el-input type="number" v-model="textNum"></el-input>
            </el-form-item>
            <el-form-item label="技能成绩">
                <el-input type="number" v-model="codeNum" ></el-input>
            </el-form-item>
            <el-form-item label="选择时间">
                <el-date-picker 
                    v-model="date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitExam">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {submitExam} from '@/api/info'
export default {
    data(){
        return {
            textNum:'',
            codeNum:'',
            date:new Date().toLocaleDateString(),
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    methods:{
        submitExam(){
            let date = new Date(this.date).toLocaleDateString();
            submitExam({
                date,
                textNum:this.textNum,
                codeNum:this.codeNum
            }).then(res=>{
                if(res.data.code){
                    this.$message({
                        message:'提交成功',
                        type:'success'
                    });
                    this.$router.push('/index/show')
                }
                
            })
        }
    }
}
</script>
<style scoped  lang="">

</style>