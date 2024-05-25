<template>
    <div>
        <el-switch class="switch"
        @change = "changeButton"
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="以段号为横坐标"
        inactive-text="以日期为横坐标">
        </el-switch>
    </div>
</template>
<script>
import pubsub from 'pubsub-js'
export default {
    name:"ChangeButton",
    data() {
      return {
        value2: true
      }
    },
    methods: {
        changeButton(state){
            console.log(state);
            pubsub.publish('changeShow', state);
        }
    },
  };
</script>
<style lang="less" scoped>
    div{
        clear: both;
    }
    .switch{
        float: right;
    }
</style>