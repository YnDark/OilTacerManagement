<template>
  <div class="outter">
    <Echarts :option="option1" autoresize/>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  
  name: "OilBarByDay",
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
    //总数据
    let source = []; //二维数组，第一行为横轴，其他未数据

    //初始化数据
    let temp = this.$store.state.activity.data;
    let tempdate = this.$store.state.activity.date;
    let segment = this.$store.state.activity.segment;

    //处理日期
    let fullyear = [];
    fullyear[0] = "product";

    let x = 1;
    for (let i in tempdate) {
      this.$set(fullyear, x, tempdate[i].Date);
      x++;
    }
    source[0] = fullyear;
    //处理段号
    for (let i in segment) {
      source[parseInt(i) + 1] = new Array(fullyear.length).fill(0);
      this.$set(source[parseInt(i) + 1], 0, segment[i].segment.toString());
    }

    //处理数据个数
    let series = [];
    for (let i in tempdate) {
      this.$set(series, i, { type: "bar" });
    }

    //处理具体数据
    for (let i in temp) {
      //日期相同
      for (let k in tempdate) {
        if (temp[i].Date === tempdate[k].Date) {
          //日期相同
          let sum = 0;
          for (let j in segment) {
            if (temp[i].segment === segment[j].segment) {
                //段号相同
                this.$set(
                    source[parseInt(j) + 1],
                    parseInt(k) + 1,
                    temp[i].OilMess
                );
            }
          }
        }
      }
    }
    let sumMess = [];
    for(let i=1 ; i<source[0].length;i++){
        let sum=0;
        for(let k=1 ; k<source.length;k++){
            sum+=source[k][i];
        }
        sumMess[i] = sum;
    }
    for(let i=1 ; i<source[0].length;i++){
        for(let k=1 ; k<source.length;k++){
          if(sumMess[i]==0){
            this.$set(source[k],i,0);
          }
          else{
            this.$set(source[k],i,(source[k][i]/sumMess[i])*100);
          }

        }
    }
    console.log(sumMess)
    console.log(series)
    console.log(source)
    this.$store.state.activity.dateAll = sumMess;
    this.$store.state.activity.series = series;
    this.$store.state.activity.source = source;
  },
  computed: {
    option1() {
      console.log(this.$store.state.activity.source);
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
        dataset: {
          /*source: [
                                        //['product', '2015', '2016', '2017'],
                                        this.fullyear,
                                        ['Matcha Latte', 43.3, 85.8],
                                        ['Milk Tea', 83.1, 73.4],
                                        ['Cheese Cocoa', 86.4, 65.2],
                                        ['Walnut Brownie', 72.4, 53.9]
                                    ]*/
          source: this.$store.state.activity.source,
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
        series: this.$store.state.activity.series,
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