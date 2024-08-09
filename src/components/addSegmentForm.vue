<template>
    <div>
        <!-- Form -->
        <el-dialog title="添加段" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

            <el-form-item label="段号" prop="segment" >
                <el-input  v-model.number="ruleForm.segment" autocomplete="off" :disabled="isInput"></el-input>
            </el-form-item>

            <el-form-item label="井名" prop="oilName">
                <el-input  v-model="ruleForm.oilName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="油溶性示踪剂体积(L)" prop="oilVolume">
                <el-input  v-model="ruleForm.oilVolume" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="水溶性示踪剂体积(L)" prop="waterVolume">
                <el-input  v-model="ruleForm.waterVolume" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="油溶性示踪剂有效含量(%)" prop="oilEffective">
                <el-input  v-model="ruleForm.oilEffective" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="水溶性示踪剂有效含量(%)" prop="waterEffective">
                <el-input  v-model="ruleForm.waterEffective" autocomplete="off"></el-input>
            </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" :plain="true">提交</el-button>
                <el-button @click="resetForm('ruleForm')" :plain="true">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import PubSub from 'pubsub-js';
  export default {
    data() {
      let checkSegment = (rule, value, callback) => {
        if (this.ruleForm.segment==='') {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if ( isNaN(parseFloat(this.ruleForm.segment))) {
            callback(new Error('格式不符合'));
          } else {
            callback();
          }
        }, 300);
      };
      let validNumber = (rule, value, callback) =>  {
        if (value==='') {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (isNaN(parseFloat(value))) {
            callback(new Error('格式不符合'));
          } else {
              callback();
          }
        }, 300);
      };
      let oilName = (rule, value, callback) =>  {
        if (value==='') {
          return callback(new Error('不能为空'));
        }
        else{
          callback()
        }
      };
      let col = (rule, value, callback) =>  {
        if (value==='') {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (isNaN(parseFloat(value))) {
            callback(new Error('格式不符合'));
          }
          else if(value>100){
            callback(new Error('含量不可大于100%'));
          } 
          else {
              callback();
          }
        }, 300);
      };
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        ruleForm: {
        oilName:"",
          segment:"",
          waterVolume:"",
          oilVolume:"",
          oilEffective:"",
          waterEffective:""
        },
        isInput:false,
        formLabelWidth: '120px',
        //校验规则
        rules: {
          segment: [
            { validator: checkSegment, trigger: 'blur' }
          ],
          waterVolume: [
            { validator: validNumber, trigger: 'blur' }
          ],
          oilVolume: [
            { validator: validNumber, trigger: 'blur' }
          ],
          oilName: [
            { validator: oilName, trigger: 'blur' }
          ],
          oilEffective: [
            { validator: col, trigger: 'blur' }
          ],
          waterEffective: [
            { validator: col, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newobj = {
                segment_number:this.ruleForm.segment.toString(),
                segment_name:this.ruleForm.oilName.toString(),
                oil_all:this.ruleForm.oilVolume.toString(),
                water_all:this.ruleForm.waterVolume.toString(),
                oil_effective_content:this.ruleForm.oilEffective.toString(),
                water_effective_content:this.ruleForm.waterEffective.toString(),
            }
            //是否存在重复校验
            for(let i in this.$store.state.activity.segmentData){
              if(this.$store.state.activity.data[i].segment.toString() === this.ruleForm.segment.toString()){
                this.$message.error('已经存在相同段号的数据，请确保没有重复段号')
                return false;
              }
            }
            // for(let i of this.$store.state.activity.segmentData){
            //   if(i.segment_number === newobj.segment_number){
            //     i.segment_name = newobj.segment_name;
            //     i.oil_all = this.ruleForm.oilVolume;
            //     i.water_all = this.ruleForm.waterVolume;
            //   }
            // }
            // this.$store.state.activity.segmentData.push(newobj);

            this.$store.state.activity.segmentData.push(newobj);

            //数据库添加
            this.$message({
              message:'添加成功',
              type: 'success'
            });
            axios.post('http://localhost:8002/addSegment',{
              params:{
                segment_number:this.ruleForm.segment.toString(),
                segment_name:this.ruleForm.oilName.toString(),
                oil_all:this.ruleForm.oilVolume.toString(),
                water_all:this.ruleForm.waterVolume.toString(),
                oil_effective_content:this.ruleForm.oilEffective.toString(),
                water_effective_content:this.ruleForm.waterEffective.toString(),
              }}
            ).then((res)=>{
                console.log(res.data);
            }).catch(function(error){
                console.log(error);
            });

            //清空表单
            this.ruleForm.segment = "";
            this.ruleForm.oilName = "";
            this.ruleForm.oilVolume = "";
            this.ruleForm.waterVolume = "";
            this.ruleForm.oilEffective = "";
            this.ruleForm.waterEffective = "";
          } else {
            this.$message.error('添加失败,数据校验未通过')
            console.log('添加失败');
            return false;
          }
        });
        this.dialogFormVisible = false;
      },
      resetForm(formName) {
        this.dialogFormVisible = false;
      }
    },
    mounted(){
        PubSub.subscribe("showAddSegmentForm",(e)=>{
            this.ruleForm.segment = "";
            this.ruleForm.oilName = "";
            this.ruleForm.oilVolume = "";
            this.ruleForm.waterVolume = "";
            this.ruleForm.oilEffective = "";
            this.ruleForm.waterEffective = "";
            this.dialogFormVisible = !this.dialogFormVisible ;
            console.log(this.dialogFormVisible);
        });
    }
  };
</script>

<style lang="less" scoped>

</style>