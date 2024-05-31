<template>
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%">
      <el-table-column
      min-width="50"
      prop="segment"
      sortable
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
        <span style="margin-left: 10px">{{ scope.row.OilCol }}</span>
      </template>
    </el-table-column>
    <el-table-column
      min-width="50"
      label="油质量"
      prop="oilMess"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.OilMess }}</span>
      </template>
    </el-table-column>
    <el-table-column
      min-width="50"
      label="水质量"
      prop="waterMess"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.WaterMess }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :filters = allDate
      :filter-method="filterHandler"
      :formatter="formatter"
      min-width="50"
      label="日期"
      prop="date"
      width="300">
    </el-table-column>
    <el-table-column label="操作" min-width="300">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button> -->
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
import axios from 'axios';
  export default {
    name:"Table",
    data() {
      return {
        tableData: this.$store.state.activity.data
      }
    },
    computed:{
      allDate(){
        let tempdate = this.$store.state.activity.date;
        let showDate = [];
        for(let i in tempdate){
          let year = new Date(tempdate[i].Date).getFullYear().toString();
          let month = (new Date(tempdate[i].Date).getMonth() + 1).toString();
          let strDate = new Date(tempdate[i].Date).getDate().toString();
          showDate[i] = {
            text:year+"-"+month+"-"+strDate,
            value:year+"-"+month+"-"+strDate
          };
        }
        console.log(showDate);
        return showDate;
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        for(let i in this.$store.state.activity.data){
          if(this.$store.state.activity.data[i].segment === row.segment && this.$store.state.activity.data[i].Date === row.Date){
            this.$store.state.activity.data.splice(i, 1);
            break;
          }
        }
        console.log(index, row);
        console.log({
                Date:row.Date,
                OilCol:row.OilCol.toString(),
                WaterCol:row.WaterCol.toString(),
                segment:row.segment.toString(),
          })
        axios.post('http://localhost:8002/update',{
            params:{
                Date:row.Date,
                OilCol:row.OilCol.toString(),
                WaterCol:row.WaterCol.toString(),
                segment:row.segment.toString(),
          }}
          ).then((res)=>{
            console.log(res.data);
          }).catch(function(error){
          console.log(error);
          });
      },
      handleDelete(index, row) {
        for(let i in this.$store.state.activity.data){
          if(this.$store.state.activity.data[i].segment === row.segment && this.$store.state.activity.data[i].Date === row.Date){
            this.$store.state.activity.data.splice(i, 1);
            break;
          }
        }
        console.log(index, row);
        console.log({
                Date:row.Date,
                OilCol:row.OilCol.toString(),
                WaterCol:row.WaterCol.toString(),
                segment:row.segment.toString(),
          })
        axios.post('http://localhost:8002/delete',{
            params:{
                Date:row.Date,
                OilCol:row.OilCol.toString(),
                WaterCol:row.WaterCol.toString(),
                segment:row.segment.toString(),
          }}
          ).then((res)=>{
            console.log(res.data);
          }).catch(function(error){
          console.log(error);
          });
      },
      indexMethod(index) {
        return index;
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return `${new Date(row.Date).getFullYear()}-${new Date(row.Date).getMonth()+1}-${new Date(row.Date).getDate()}`;
      },
      filterHandler(value, row, column) {
        return `${new Date(row.Date).getFullYear()}-${new Date(row.Date).getMonth()+1}-${new Date(row.Date).getDate()}`.toString() === value;
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-table{
    overflow: hidden;
    margin-bottom: 50px;
  }
</style>