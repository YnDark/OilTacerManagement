<template>
    <div class="outter">
      <Echarts :option="option1" autoresize/>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  export default {
    name: "OilBarByAll",
    data() {
      return {};
    },
    components: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    beforeMount() {
      Promise.all([
      new Promise((resolve) =>{
        //获取全部数据
        axios.get('http://localhost:8002/info').then((res)=>{
          resolve(res.data);
          console.log(res.data);
        }).catch(function(error){
          console.log(error);
        });
      }),
      new Promise((resolve) =>{
        //获取全部日期
        axios.get('http://localhost:8002/date').then((res)=>{
          resolve(res.data);
        }).catch(function(error){
          console.log(error);
        });
      }),
      new Promise((resolve) =>{
        //获取全部段号
        axios.get('http://localhost:8002/segment').then((res)=>{
          console.log(res.data);
          resolve(res.data);
        }).catch(function(error){
          console.log(error);
        });
      }),]).then(res=>{
        this.$store.state.activity.data = res[0];
        this.$store.state.activity.date = res[1];
        this.$store.state.activity.segment = res[2];
        console.log(res);
      })
    },
    computed: {
      option1() {
        let data = this.$store.state.activity.data;
        let segment = this.$store.state.activity.segment;
        console.log(segment)
        let sum = 0;
        for(let i in data){
            sum+=data[i].OilMess
        }
        console.log(sum)
        let sumSeg = [];
        for(let i=0; i<segment.length; i++){
            let sumEach = 0;
            for(let k in data){
                if(segment[i].segment === data[k].segment){
                    sumEach += data[k].OilMess; 
                }
            }
            sumSeg[i] = Number((sumEach/sum).toFixed(4))*100;
        }
        return {
          legend: {},
          tooltip: {},
          grid: {
            show: true,
            borderWidth:2,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            name: "段号",
            nameLocation: "center",
            nameTextStyle: {
              lineHeight: 80,
              fontSize: 20,
              color: "black",
              fontWeight: "bolder",
            },
            axisLabel: {
              lineHeight: 25,
              fontSize: 18,
              color: "black",
              formatter: "第 {value} 段",
              align: "center",
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
            data: this.$store.state.activity.segment.map((e)=>{return e.segment}),
          },
          yAxis: {
            show: true,
            name: "油浓度",
            nameLocation: "center",
            nameTextStyle: {
              lineHeight: 100,
              color: "black",
              fontSize: 20,
              fontWeight: "bolder",
            },
            axisLabel: {
              lineHeight: 25,
              fontSize: 18,
              color: "black",
              formatter: "{value} %",
              align: "center",
              align: "right",
              margin: 10,
            },
            axisLine: {
              show: true, // 是否显示坐标轴轴线
              lineStyle: {
                color: "#999", // 坐标轴线线的颜色
                width: "1", // 坐标轴线线宽
                type: "solid", // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
              },
            },
            axisTick: {
              show: true, // 是否显示坐标轴刻度
              inside: true, // 坐标轴刻度是否朝内，默认朝外
              length: 15, //坐标轴刻度的长度
              lineStyle: {
                color: "black", //刻度线的颜色
                width: 2, //坐标轴刻度线宽
                type: "solid", //坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
              },
            },
          },
          series: [{
            data: sumSeg,
            type:"bar"
        }],
        };
      },
    },
  };
  </script>
    
    <style lang="less" scoped>
  .outter {
    height: 100vh;
  }
  </style>