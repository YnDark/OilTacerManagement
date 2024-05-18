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
  mounted(){
    axios.get('http://localhost:8002/info').then((res)=>{
      console.log(this.$store.state.tab.isCollapse);
      console.log(res);
      this.$store.state.activity.data = res.data;
      console.log(this.$store.state.activity.data);
    }).catch(function(error){
      console.log(error);
    });
  }
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
