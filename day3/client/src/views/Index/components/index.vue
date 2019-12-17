<template>
    <div>
        <h2>成绩图示表</h2>
        <div :style="{width:'500px',height:'300px',border:'1px solid #000'}" ref="linebox">

        </div>
    </div>
</template>

<script>
import Echarts from 'echarts'
import {getAg} from '@/api/info'
let option = {
        title: {
            text: '成绩图示'
        },
        tooltip: {},
        legend: {
            data:['技能平均成绩','理论平均成绩']
        },
        xAxis: {
            splitNumber:5,
            data: []
        },
        yAxis: {},
        series: [{
            name: '技能平均成绩',
            type: 'line',
            data: []
        },{
            name: '理论平均成绩',
            type: 'line',
            data: []
        }]
    };
export default {
    data(){
        return {
            linebox:null
        }
    },
    mounted(){
        this.linebox = Echarts.init(this.$refs.linebox);
        getAg().then(({data})=>{
            option.xAxis.data = data.data.map(item=>item.date);
            option.series[0].data = data.data.map(item=>item.codeAg);
            option.series[1].data = data.data.map(item=>item.textAg);
            console.log(option);
            this.linebox.setOption(option);
        })
       
        // console.log()
        
    }
}
</script>
<style scoped  lang="">

</style>