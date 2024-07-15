<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column
        min-width="50"
        label="段号"
        width="100"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.segment }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :filters="nonTimeDate"
        :filter-method="filterHandler"
        :formatter="formatter"
        min-width="50"
        label="日期"
        prop="date"
        width="300"
      >
      </el-table-column>
      <el-table-column
        label="水浓度(ug/cd)"
        prop="WaterCol"
        min-width="100"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.WaterCol }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        label="油浓度(ug/cd)"
        prop="oilCol"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.OilCol }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        label="油质量(g/d)"
        prop="oilMess"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.OilMess }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        label="水质量(g/d)"
        prop="waterMess"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.WaterMess }}</span>
        </template>
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
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Form></Form>
    <el-button type="primary" @click="changeVisiable">添加数据</el-button>
  </div>
</template>
  
  <script>
import axios from "axios";
import moment from "moment";
import PubSub from "pubsub-js";
import Form from '../components/Form.vue';
export default {
  name: "OneSegData",
  components:{
    Form
  },
  data() {
    return {
    };
  },
  computed: {
    tableData() {
        let allData = this.$store.state.activity.data;
        let target = this.$route.query;
        console.log(target)
        console.log(allData)
        let segData = [];
        for(let i in allData){
            if(allData[i].segment == target.segment_number){
                segData.push(allData[i]);
            }
        }
        this.$store.state.activity.segData = segData;
        return this.$store.state.activity.segData;
    },
    nonTimeDate() {
      let tempdate = this.$store.state.activity.data;
      let showDate = new Set();
      for (let i in tempdate) {
        let time = moment(new Date(tempdate[i].Date)).format("YYYY-MM-DD");
        showDate.add(time);
      }
      let showList = [];
      for (let i of showDate) {
        showList.push({
          text: i,
          value: i,
        });
      }
      return showList;
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      for (let i in this.$store.state.activity.data) {
        if (
          this.$store.state.activity.data[i].segment === row.segment &&
          this.$store.state.activity.data[i].Date === row.Date
        ) {
          this.$store.state.activity.data.splice(i, 1);
          break;
        }
      }
      console.log(index, row);
      console.log({
        Date: row.Date,
        OilCol: row.OilCol.toString(),
        WaterCol: row.WaterCol.toString(),
        segment: row.segment.toString(),
      });
      axios
        .post("http://localhost:8002/update", {
          params: {
            Date: row.Date,
            OilCol: row.OilCol.toString(),
            WaterCol: row.WaterCol.toString(),
            segment: row.segment.toString(),
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      for (let i in this.$store.state.activity.data) {
        if (
          this.$store.state.activity.data[i].segment === row.segment &&
          this.$store.state.activity.data[i].Date === row.Date
        ) {
          this.$store.state.activity.data.splice(i, 1);
          break;
        }
      }
      console.log(index, row);
      console.log({
        Date: row.Date,
        OilCol: row.OilCol.toString(),
        WaterCol: row.WaterCol.toString(),
        segment: row.segment.toString(),
      });
      axios
        .post("http://localhost:8002/delete", {
          params: {
            Date: row.Date,
            OilCol: row.OilCol.toString(),
            WaterCol: row.WaterCol.toString(),
            segment: row.segment.toString(),
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    indexMethod(index) {
      return index;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return moment(row.Date).format("YYYY-MM-DD HH:mm");
    },
    filterHandler(value, row, column) {
      return (
        moment(row.Date).format("YYYY-MM-DD") ===
        moment(value).format("YYYY-MM-DD")
      );
    },
    filterHandler2(value, row, column) {
      return row.segment === value;
    },
    changeVisiable() {
      PubSub.publish("showForm");
    },
  },
  mounted() {},
};
</script>
  <style lang="less" scoped>
.el-table {
  overflow: hidden;
  margin-bottom: 50px;
}
</style>