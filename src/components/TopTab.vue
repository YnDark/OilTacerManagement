<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有数据" name="allActive">
      <Table></Table>
    </el-tab-pane>
    <el-tab-pane label="分段数据" name="allActive2">
      <div>
        <el-row :gutter="20" style="margin-right: 15px;margin-left: -5px" type="flex" v-loading="loading">
          <el-col v-for="(item, index) in segmentData" :key="index" :span="6">
            <el-card class="box-card" shadow="always" :body-style="{ padding: '0px' }">
              <div slot="header" class="header">
                <span class="label">第{{item.segment_number}}段</span>
                <span class="header-label">{{item.segment_name}}</span>
              </div>
              <div style="margin: 15px">
                <div><div class="card-label">注入油溶性示踪剂总量:</div><span>{{item.oil_all}} L</span></div>
                <div><div class="card-label">注入水溶性示踪剂总量:</div><span>{{item.water_all}} L</span></div>
                <div><div class="card-label">油溶性示踪剂有效含量(%):</div><span>{{item.oil_effective_content}} %</span></div>
                <div><div class="card-label">水溶性示踪剂有效含量(%):</div><span>{{item.water_effective_content}} %</span></div>
              </div>
              <div class="footer">
                <div style="display: flex;align-items: center">
                  <el-button type="text" style="color: #18c8bd" @click="changeSegment(index)">修改分段</el-button>
                </div>
                <div style="display:flex; align-items: center;color: #cccccc">|</div>
                <div style="display: flex;align-items: center">
                  <el-button type="text" style="color: #18c8bd" @click="addSegmentData(index)">添加分段数据</el-button>
                </div>
                <div style="display:flex; align-items: center;color: #cccccc">|</div>
                <div style="display: flex;align-items: center">
                  <el-button type="text" style="color: #18c8bd" @click="open(index)">删除分段</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <SegmentForm></SegmentForm>
        <AddSegmentForm></AddSegmentForm>
        <el-button type="primary" @click="addSegment()">添加分段</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import axios from 'axios';
import Table from "./Table.vue";
import SegmentForm from "./SegmentForm.vue"
import PubSub from 'pubsub-js';
import AddSegmentForm from './addSegmentForm.vue'
export default {
  components: { 
    Table,
    SegmentForm,
    AddSegmentForm
   },
  name: "TopTab",
  data() {
    return {
      activeName: "allActive",
      size: '',
      loading:true
    };
  },
  computed:{
    segmentData(){
      return this.$store.state.activity.segmentData;
    }
  },
  mounted(){
    axios.get('http://localhost:8002/selectSegmentData').then((res)=>{
      this.$store.state.activity.segmentData = res.data;
      this.loading = false;
        console.log(res.data);
      }).catch(function(error){
        console.log(error);
      });
  },
  methods: {
    changeSegment(index) {
      PubSub.publish("showSegmentForm",this.segmentData[index])
    },
    addSegmentData(index) {
      this.$router.push({
        name:'OneSegData',
        query:this.segmentData[index]
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }, 
    open(index) {
        this.$confirm('此操作将永久删除该段所有数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("删除中")
          axios.post("http://localhost:8002/deleteSegment", {
            params: {
              segment_number:this.segmentData[index].segment_number
            },
          })
          .then((res) => {
            console.log(res.data);
            this.segmentData = this.segmentData.filter((e)=>{
              console.log(this.segmentData[index].segment_number);
              console.log(e.segment_number);
              console.log(e.segment_number !== this.segmentData[index].segment_number)
              return e.segment_number !== this.segmentData[index].segment_number
            })
            this.$forceUpdate();
            console.log(this.segmentData);

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch((error)=>{
            console.log(error);
            this.$message({
              type: 'info',
              message: '删除出错'
          });  
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addSegment(){
      console.log("showAddSegmentForm");
      PubSub.publish("showAddSegmentForm");
    }
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 200px;
}
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.card-context {
  flex: 1;
  width: 300px;
  min-width: 300px;
  height: 300px;
  margin: 10px;
  border: solid 3px pink;
}
.card-context.no-border {
  border: none;
}
.el-row {
  display:flex;
  flex-wrap: wrap;
  align-items: center;
}
.el-row  .el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  transition: all .5s;
}
.el-form-item {
  margin-bottom: 0 !important;
}
.pagination-container {
  margin-top: -3px;
  margin-bottom: 30px;
}
.box-card {
  .header {
    position: relative;
    .label{
      padding: 0 3px;
      background-color: #fdf0da;
      color: #f19901;
    }
    .header-label {
      padding-left: 10px;
    }
    .card-header-tag-blue {
      position: absolute;
      width: 68px;
      height: 30px;
      top: -14px;
      right: -15px;
      display: inline-block;
    }
    .card-header-tag-green {
      position: absolute;
      width: 68px;
      height: 30px;
      top: -14px;
      right: -15px;
      display: inline-block;
    }
  }
  .footer {
    font-size: 18px !important;
    background-color: rgb(245, 247, 251);
    display: flex;
    height: 50px;
    justify-content: space-evenly;
  }
  .card-label {
    color: rgb(197, 197, 197);
    margin-right: 8px;
    width: 200px;
    display: inline-block;
    margin-bottom: 5px;
  }
}
</style>