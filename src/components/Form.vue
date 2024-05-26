<template>
    <div>
        <!-- Form -->
        <el-button type="primary" @click="dialogFormVisible = true">添加数据</el-button>

        <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="段号" prop="pass">
                <el-input  v-model="ruleForm.segment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="油浓度" prop="checkPass">
                <el-input  v-model="ruleForm.oilCol" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="水浓度" prop="age">
                <el-input v-model.number="ruleForm.waterCol"></el-input>
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
  export default {
    data() {
      var checkSegment = (rule, value, callback) => {
        if (this.ruleForm.segment==='') {
          return callback(new Error('段号不能为空'));
        }
        setTimeout(() => {
          if ( isNaN(parseFloat(this.ruleForm.segment))) {
            callback(new Error('请输入段号'));
          } else {
            if (this.ruleForm.segment > 100) {
              callback(new Error('不可大于100'));
            } else {
              callback();
            }
          }
        }, 300);
      };
      var validatePass = (rule, value, callback) =>  {
        if (this.ruleForm.oilCol==='') {
          return callback(new Error('油浓度不能为空'));
        }
        setTimeout(() => {
          if (isNaN(parseFloat(this.ruleForm.oilCol))) {
            callback(new Error('请输入油浓度'));
          } else {
            if (this.ruleForm.oilCol > 100) {
              callback(new Error('不可大于100'));
            } else {
              callback();
            }
          }
        }, 300);
      };
      var validatePass2 = (rule, value, callback) =>  {
        if (this.ruleForm.waterCol==='') {
          return callback(new Error('水浓度不能为空'));
        }
        setTimeout(() => {
          if (isNaN(parseFloat(this.ruleForm.waterCol))) {
            callback(new Error('请输入水浓度'));
          } else {
            if (this.ruleForm.waterCol > 100) {
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
          date:""
        },
        formLabelWidth: '120px',
        //校验规则
        rules: {
          pass: [
            { validator: checkSegment, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          age: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log({
                Date:new Date(this.ruleForm.date),
                oilCol:this.ruleForm.oilCol.toString(),
                waterCol:this.ruleForm.waterCol.toString(),
                segment:this.ruleForm.segment.toString(),
            });
            this.$store.state.activity.data.push({
                Date:new Date(this.ruleForm.date),
                OilCol:this.ruleForm.oilCol.toString(),
                WaterCol:this.ruleForm.waterCol.toString(),
                segment:this.ruleForm.segment.toString(),
            });
            this.$message('添加成功');
            this.ruleForm.segment = "";
            this.ruleForm.oilCol = "";
            this.ruleForm.waterCol = "";
            this.ruleForm.date = "";
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