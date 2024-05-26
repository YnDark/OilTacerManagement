<template>
  <div>
    <TopTab></TopTab>
    <Form></Form>
  </div>
</template>

<script>
import axios from "axios"
import TopTab from '../components/TopTab.vue'
import  Form from '../components/Form.vue'
export default {
  name: 'ActivityAudit',
  components: {
    TopTab,
    Form
  },
  methods:{
    show(){
      axios.get('http://localhost:8002/info').then(function(res){
        console.log(res);
        alert(res.data[0].Date);
      }).catch(function(error){
        console.log(error);
      });
      axios.get('http://localhost:8002/Date').then(function(res){
        console.log(res);
        alert(res.data);
      }).catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>

<style lang="less" scoped>
</style>
