<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有数据" name="allActive">
      <Table></Table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Table from './Table.vue';
export default {
  components: { Table },
    name:"TopTab",
    data() {
      return {
        activeName: 'allActive'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang="less" scoped>
</style>