<template>
    <div>
        <!-- Form -->
        <el-button type="primary" @click="dialogFormVisible = true">添加数据</el-button>

        <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="段号" prop="segment">
                <el-input  v-model.number="ruleForm.segment" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="油浓度" prop="oilCol">
                <el-input  v-model="ruleForm.oilCol" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="水浓度" prop="waterCol">
                <el-input v-model="ruleForm.waterCol"></el-input>
            </el-form-item>

            <el-form-item label="油质量" prop="oilMess">
                <el-input v-model="ruleForm.oilMess"></el-input>
            </el-form-item>

            <el-form-item label="水质量" prop="waterMess">
                <el-input v-model="ruleForm.waterMess"></el-input>
            </el-form-item>

            <el-form-item label="日期">
                <div class="block">
                    <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
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
            if (this.ruleForm.segment > 100) {
              callback(new Error('不可大于100'));
            } else {
              callback();
            }
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
            if (value > 100) {
              callback(new Error('不可大于100'));
            } else {
              callback();
            }
          }
        }, 300);
      };

      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        ruleForm: {
          segment:"",
          oilCol:"",
          waterCol:"",
          date:"",
          oilMess:"",
          waterMess:""
        },
        formLabelWidth: '120px',
        //校验规则
        rules: {
          segment: [
            { validator: checkSegment, trigger: 'blur' }
          ],
          waterCol: [
            { validator: validNumber, trigger: 'blur' }
          ],
          oilCol: [
            { validator: validNumber, trigger: 'blur' }
          ],
          waterMess: [
            { validator: validNumber, trigger: 'blur' }
          ],
          oilMess: [
            { validator: validNumber, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newobj = {
                Date:new Date(this.ruleForm.date),
                OilCol:this.ruleForm.oilCol.toString(),
                WaterCol:this.ruleForm.waterCol.toString(),
                segment:this.ruleForm.segment.toString(),
                OilMess:this.ruleForm.oilMess.toString(),
                WaterMess:this.ruleForm.waterMess.toString(),
            }
            this.$store.state.activity.data.push(newobj);

            this.$message('添加成功');
            axios.post('http://localhost:8002/insert',{
              params:{
                Date:new Date(this.ruleForm.date),
                OilCol:this.ruleForm.oilCol.toString(),
                WaterCol:this.ruleForm.waterCol.toString(),
                segment:this.ruleForm.segment.toString(),
                OilMess:this.ruleForm.oilMess.toString(),
                WaterMess:this.ruleForm.waterMess.toString()
              }}
            ).then((res)=>{
                console.log(res.data);
            }).catch(function(error){
                console.log(error);
            });
            this.ruleForm.segment = "";
            this.ruleForm.oilCol = "";
            this.ruleForm.waterCol = "";
            this.ruleForm.date = "";
            this.ruleForm.oilMess = "";
            this.ruleForm.waterMess = "";
          } else {
            console.log('添加失败');
            return false;
          }
        });
        this.dialogFormVisible = false;
      },
      resetForm(formName) {
        this.dialogFormVisible = false;
      }
    }
  };
</script>