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
  data(){

    //处理日期
    let temp = this.$store.state.activity.data;
    let tempdate = this.$store.state.activity.date;
    let fullyear = [];
    fullyear[0] = 'product';
    let x = 1;
    for(let i in tempdate){
      let year = new Date(tempdate[i].Date).getFullYear().toString();
      let month = (new Date(tempdate[i].Date).getMonth() + 1).toString();
      let strDate = new Date(tempdate[i].Date).getDate().toString();
      fullyear[x] = year+"-"+month+"-"+strDate;
      x++;
    }
    console.log(fullyear);

    //处理数据个数
    let series = [];
    for(let i in tempdate){
      series[i] = { type: 'bar' };
    }

    //处理具体数据
    let allData = [];
    
    return{
      series,
      fullyear,
      isShow:true
    }
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
    showdata(){},
    option1(){
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            //['product', '2015', '2016', '2017'],
            this.fullyear,
            ['Matcha Latte', 43.3, 85.8],
            ['Milk Tea', 83.1, 73.4],
            ['Cheese Cocoa', 86.4, 65.2],
            ['Walnut Brownie', 72.4, 53.9]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: this.series
      };
    },
    option2(){
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2000', '20123', '23011'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      };
    }
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
