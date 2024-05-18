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
    return{
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
    date(){
      return {
      }
    },
    showdata(){},
    option1(){
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
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
