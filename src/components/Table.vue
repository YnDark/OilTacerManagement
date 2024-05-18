<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      min-width="50"
      prop="segment"
      label="序号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
        <el-table-column
      min-width="50"
      prop="segment"
      label="段号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.segment}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="水浓度"
      prop="WaterCol"
      min-width="100"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.WaterCol}}</span>
      </template>
    </el-table-column>
    <el-table-column
      min-width="50"
      label="油浓度"
      prop="oilCol"
      width="300">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.OilCol }}</span>
      </template>
    </el-table-column>
    <el-table-column
      min-width="50"
      label="日期"
      prop="date"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.Date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:"Table",
    data() {
      return {
        tableData: this.$store.state.activity.data
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      indexMethod(index) {
        return index;
      },
    }
  }
</script>
<style lang="less" scoped>
  .el-table{
    overflow: hidden;
  }
</style>