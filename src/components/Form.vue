<template>
  <div>
    <!-- Form -->
    <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="段号" prop="segment">
          <el-input
            :disabled = "segMentDisable"
            v-model.number="ruleForm.segment"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="油浓度(ug/cd)" prop="oilCol">
          <el-input v-model="ruleForm.oilCol" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="水浓度(ug/cd)" prop="waterCol">
          <el-input v-model="ruleForm.waterCol"></el-input>
        </el-form-item>

        <el-form-item label="油质量(g/d)" prop="oilMess">
          <el-input v-model="ruleForm.oilMess"></el-input>
        </el-form-item>

        <el-form-item label="水质量(g/d)" prop="waterMess">
          <el-input v-model="ruleForm.waterMess"></el-input>
        </el-form-item>

        <el-form-item label="日期">
          <div class="block">
            <el-date-picker
              v-model="ruleForm.date"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')" :plain="true"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')" :plain="true">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    let checkSegment = (rule, value, callback) => {
      if (this.ruleForm.segment === "") {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (isNaN(parseFloat(this.ruleForm.segment))) {
          callback(new Error("格式不符合"));
        } else {
          callback();
        }
      }, 300);
    };
    let validNumber = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (isNaN(parseFloat(value))) {
          callback(new Error("格式不符合"));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        segment: "",
        oilCol: "",
        waterCol: "",
        date: "",
        oilMess: "",
        waterMess: "",
      },
      segMentDisable:false,
      formLabelWidth: "120px",
      //校验规则
      rules: {
        segment: [{ validator: checkSegment, trigger: "blur" }],
        waterCol: [{ validator: validNumber, trigger: "blur" }],
        oilCol: [{ validator: validNumber, trigger: "blur" }],
        waterMess: [{ validator: validNumber, trigger: "blur" }],
        oilMess: [{ validator: validNumber, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newobj = {
            Date: new Date(this.ruleForm.date),
            OilCol: this.ruleForm.oilCol.toString(),
            WaterCol: this.ruleForm.waterCol.toString(),
            segment: this.ruleForm.segment.toString(),
            OilMess: this.ruleForm.oilMess.toString(),
            WaterMess: this.ruleForm.waterMess.toString(),
          };
          //是否存在重复校验
          for (let i in this.$store.state.activity.data) {
            if (this.$store.state.activity.data == null) {
              this.$message.error(
                "添加失败,请保证数据加载完成再添加，请多切换再试"
              );
              return false;
            }

            if (
              new Date(this.$store.state.activity.data[i].Date).getTime() ==
                new Date(this.ruleForm.date).getTime() &&
              this.$store.state.activity.data[i].segment.toString() ===
                this.ruleForm.segment.toString()
            ) {
              this.$message.error(
                "已经存在相同日期和段号的数据，请删除后再添加"
              );
              return false;
            }
          }

          this.$store.state.activity.data.push(newobj);

          //数据库更新
          this.$message({
            message: "添加成功",
            type: "success",
          });
            axios
              .post("http://localhost:8002/insert", {
                params: {
                  Date: new Date(this.ruleForm.date),
                  OilCol: this.ruleForm.oilCol.toString(),
                  WaterCol: this.ruleForm.waterCol.toString(),
                  segment: this.ruleForm.segment.toString(),
                  OilMess: this.ruleForm.oilMess.toString(),
                  WaterMess: this.ruleForm.waterMess.toString(),
                },
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch(function (error) {
                console.log(error);
              });

          //清空表单
          this.ruleForm.segment = "";
          this.ruleForm.oilCol = "";
          this.ruleForm.waterCol = "";
          this.ruleForm.date = "";
          this.ruleForm.oilMess = "";
          this.ruleForm.waterMess = "";
        } else {
          this.$message.error("添加失败,数据校验未通过");
          console.log("添加失败");
          return false;
        }
      });
      this.dialogFormVisible = false;
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    console.log(this.$route.path)
    if(this.$route.path  === "/ActivityAudit"){
      this.segMentDisable = false;
    }
    else{
      this.segMentDisable = true;
    }
    PubSub.subscribe("showForm", () => {
      this.dialogFormVisible = !this.dialogFormVisible;
    });
    PubSub.subscribe("showOneSegForm", (x,e) => {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.ruleForm.segment = e;
    });
  },
};
</script>

<style lang="less" scoped>
</style>