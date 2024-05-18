<template>
  <div>
    <TopTab></TopTab>
    <button @click="show">fasong</button>
  </div>
</template>

<script>
import axios from "axios"
import TopTab from '../components/TopTab.vue'
export default {
  name: 'ActivityAudit',
  components: {
    TopTab
  },
  methods:{
    show(){
      axios.get('http://localhost:8002/info').then(function(res){
        console.log(res);
        alert(res.data[0].Date);
      }).catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>

<style>
</style>
