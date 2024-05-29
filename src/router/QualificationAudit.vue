<template>
  <div class="outter">
    <ChangeButtonVue/>
    <Echarts v-if="isShow" :option="option1" autoresize />
    <Echarts v-if="!isShow" :option="option2" autoresize />
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import ChangeButtonVue from '../components/ChangeButton.vue';
export default {
  name: 'QualificationAudit',
  components: {
    ChangeButtonVue
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to, from) {
        // 在路由变化时执行重新创建组件的操作
        this.$destroy();
        this.$router.push(to.path);
      }
    }
  },
  data(){
    return{
      isShow:true
    }
  },
  beforeMount(){
    //总数据
    let source = [];//二维数组，第一行为横轴，其他未数据

    //初始化数据
    let temp = this.$store.state.activity.data;
    let tempdate = this.$store.state.activity.date;
    let segment = this.$store.state.activity.segment;

    //处理日期
    let fullyear = [];
    fullyear[0] = 'product';

    let x = 1;
    for(let i in tempdate){
      let year = new Date(tempdate[i].Date).getFullYear().toString();
      let month = (new Date(tempdate[i].Date).getMonth() + 1).toString();
      let strDate = new Date(tempdate[i].Date).getDate().toString();
      this.$set(fullyear,x,year+"-"+month+"-"+strDate);
      x++;
    }
    source[0] = fullyear;

    //处理段号
    for(let i in segment){
      source[parseInt(i)+1] = new Array(fullyear.length).fill(0);
      this.$set(source[parseInt(i)+1],0,segment[i].segment.toString());
    }

    //处理数据个数
    let series = [];
    for(let i in tempdate){
      this.$set(series,i,{ type: 'bar' });
    }

    //处理具体数据
    for(let i in temp){
      //日期相同
      for(let k in tempdate){
        if(temp[i].Date === tempdate[k].Date){
          //日期相同
          for(let j in segment){
            if(temp[i].segment === segment[j].segment){
              //段号相同
              this.$set(source[parseInt(j)+1],parseInt(k)+1,temp[i].OilCol);
            }
          }
        }
      }
    }
    this.$store.state.activity.series = series;
    this.$store.state.activity.source = source;

    //第二个图的数据
    let source2 = [];//二维数组，第一行为横轴，其他未数据

    //处理段号
    let s = [];
    s[0] = 'product';
    for(let i in segment){
      this.$set(s,parseInt(i)+1,segment[i].segment.toString());
    }
    source2[0] = s;

    //处理个数
    let series2 = [];
    for(let i in segment){
      this.$set(series2,i,{ type: 'bar' });
    }
    //处理日期
    for(let i in tempdate){
      source2[parseInt(i)+1] = new Array(s.length).fill(0);
      let year = new Date(tempdate[i].Date).getFullYear().toString();
      let month = (new Date(tempdate[i].Date).getMonth() + 1).toString();
      let strDate = new Date(tempdate[i].Date).getDate().toString();
      this.$set(source2[parseInt(i)+1],0,year+"-"+month+"-"+strDate);
    }
    //处理具体数据
    for(let i in temp){
      for(let k in tempdate){
        if(temp[i].Date === tempdate[k].Date){
          //日期相同
          for(let j in segment){
            if(temp[i].segment === segment[j].segment){
            //段号相同
            this.$set(source2[parseInt(k)+1],parseInt(j)+1,temp[i].OilCol);
            }
          }
        }
      }
    }
    this.$store.state.activity.series2 = series2;
    this.$store.state.activity.source2 = source2;
    console.log(source2);
  },
  mounted() {
      // 订阅消息
      this.pubId = pubsub.subscribe('changeShow', (msgName, data) => {
        this.isShow = data;
      })
  },
  beforeDestroy() {
      // 在组件销毁之前 清除订阅消息
			pubsub.unsubscribe(this.pubId)
  },
  computed:{
    option1(){
      console.log(this.$store.state.activity.source);
      return {
        legend: {},
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
          source:this.$store.state.activity.source
        },
        xAxis: { 
          type: 'category' ,
          name: '段号' ,
          nameLocation: 'center',
          nameTextStyle:{
            lineHeight:80,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel: {
            lineHeight: 25,
            fontSize: 18,
            formatter: '第 {value} 段',
            align: 'center'
            // ...
          }
        },
        yAxis: {
          name: '油浓度' ,
          nameLocation: 'center',
          nameTextStyle:{
            lineHeight:100,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel: {
            lineHeight: 25,
            fontSize: 18,
            formatter: '{value} %',
            align: 'center'
            // ...
          }
        },
        series: this.$store.state.activity.series
      };
    },
    option2(){
      return {
        legend: {
          formatter: '第 {name} 段'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {},
        dataset: {
          /*source: [
            ['product', '2000', '20123', '23011'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]*/
          source:this.$store.state.activity.source2
        },
        xAxis: { 
          type: 'category' ,
          name: '日期' ,
          nameLocation: 'center',
          nameTextStyle:{
            lineHeight:80,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel: {
            lineHeight: 25,
            fontSize: 18,
            formatter: '{value}',
            align: 'center'
            // ...
          }
        },
        yAxis: {
          name: '油浓度' ,
          nameLocation: 'center',
          nameTextStyle:{
            lineHeight:100,
            fontSize: 20,
            fontWeight:'bolder'
          },
          axisLabel: {
            lineHeight: 25,
            fontSize: 18,
            formatter: '{value} %',
            align: 'center'
            // ...
          }
        },
        series: this.$store.state.activity.series2
      };
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
  .outter {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    clear: both;
  }
</style>
