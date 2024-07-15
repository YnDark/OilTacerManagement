<template>
  <div class="outter">
    <Echarts :option="option" autoresize />
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Setting',
  components: {
  },
  mounted(){
    //总数据
    let series = [];//

    //初始化数据
    let temp = this.$store.state.activity.data;
    let tempdate = this.$store.state.activity.date;
    let segment = this.$store.state.activity.segment;

    //处理具体数据
      for(let k = 0; k < segment.length; k++){
        //
        let oilMess = new Array(tempdate.length);
        for(let j = 0;j < tempdate.length; j++){
          for(let i in temp){
            if(temp[i].Date === tempdate[j].Date && temp[i].segment === segment[k].segment){
              this.$set(oilMess,j,temp[i].OilMess);
            }
          }
        }
        //
        series.push({
          connectNulls: true,
          name: segment[k].segment,
          type: "line",
          itemStyle: {
            normal: {
                lineStyle: {
                  width:5
                }
            }
          },
          data: oilMess,
        });
    }
    this.$store.state.activity.sourceMess = series;
    console.log(this.$store.state.activity.sourceMess);
  },
  data() {
    console.log(this.$store.state.activity.date);
    return {
      option: {
        title: {
          text: '数据折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.$store.state.activity.Date
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: '日期' ,
          nameLocation: 'center',
          nameTextStyle:{
            color: 'black',
            lineHeight:100,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel: {
            lineHeight: 25,
            fontSize: 18,
            color:"black",
            formatter: '{value}',
            align: 'center',
            margin: 20,
          },
          data: this.$store.state.activity.date.map((obj)=> moment(obj.Date).format('YYYY-MM-DD'))
        },
        yAxis: {
          type: 'value',
          name: '质量' ,
          nameLocation: 'center',
          margin: 20,
          nameTextStyle:{
            color: 'black',
            lineHeight:100,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel:{
            lineHeight: 25,
            fontSize: 18,
            color: 'black',
            formatter: ' {value} 吨',
            align: 'right',
            margin: 10,
          },
          axisLine: {
            show: true,    // 是否显示坐标轴轴线
            lineStyle: {
              color: '#999',    // 坐标轴线线的颜色
              width: '1',    // 坐标轴线线宽
              type: 'solid',    // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
            },
          },
          axisTick: {
            show: true,    // 是否显示坐标轴刻度
            inside: true,     // 坐标轴刻度是否朝内，默认朝外
            length: 15,    //坐标轴刻度的长度        
            lineStyle: {
              color: 'black',     //刻度线的颜色
              width: 2,    //坐标轴刻度线宽
              type: 'solid',    //坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
            },
          },
        },
        series: this.$store.state.activity.sourceMess
    },
    computed:{
      series(){
        this.$store.state.activity.source2.map((seg) => {
          if(seg === 'product'){
            return seg.map((date)=>date);
          }
          else{
            return {
              connectNulls: true,
              name:seg,
              type: 'line',
              data:seg.map(()=>{

              })
            }
          }
        })
      }
    }

    }
  },
}
</script>

<style lang="less" scoped>
  .outter {
    width: 100%;
    height: 100vh;
    min-width: 1000px;
    clear: both;
  }
</style>
