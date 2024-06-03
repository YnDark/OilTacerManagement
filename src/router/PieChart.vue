<template>
    <div>
        <Echarts :option="option" autoresize />
    </div>
</template>

<script>
export default {
    name:"PieChart",
    components:{
    },
    created(){
        let sourceMess = this.$store.state.activity.sourceMess

        let seriesData = sourceMess.map((e)=>{
                        return{
                            name: e.name,
                            value: e.data.reduce((sum,num) => sum+num , 0)
                        }
                    });
        let legendData = seriesData.map((e)=>e.name.toString());
        console.log(seriesData)
        console.log(legendData)

        this.$store.state.activity.chartsData = {
            legendData: legendData,
            seriesData: seriesData
        };
    },
    computed:{
        option() {
            return {
                title: {
                    text: '每段产油质量统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '第 {b} {a} <br/> 总产油 {c} <br/> 占 {d}%',
                    textStyle:{
                        fontSize:15
                    },
                },
                legend: {
                    formatter: '第 {name} 段',
                    type: 'scroll',
                    orient: 'vertical',
                    textStyle:{
                        fontSize:15
                    },
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: this.$store.state.activity.chartsData.legendData
                },
                series: 
                [{
                    name: '段',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: this.$store.state.activity.chartsData.seriesData,
                    textStyle:{
                        fontSize:15
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label:{
                         formatter: '第 {b} {a}',
                         fontSize : 15
                    }
                },
                ]
            }
        },
    },
    methods:{
    }
}
</script>

<style lang="less" scoped >
    div {
        width: 100vh;
        height: 100vh;
        min-width: 1000px;
        margin: 0 auto;
    }
</style>