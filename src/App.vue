<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from './view/Layout.vue';
import axios from "axios"
export default {
  name: 'App',
  components: {
    Layout,
  },
  beforeMount(){
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
}
const debounce = (fn, delay) => {
  let timer
   return (...args) => {
     if (timer) {
       clearTimeout(timer)
     }
     timer = setTimeout(() => {
       fn(...args)
     }, delay)
   }
}
  
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 10);
     super(callback);
   }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
</style>
