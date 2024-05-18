<template>
    <div class="outter">
        <div class="leftcontent">
          <el-button @click = "changeMenu" type="primary" icon="el-icon-menu" size="small" ></el-button>
        </div>
        <div class="rightcontent">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人资料</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        username:"杨定鑫"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeMenu(){
        console.log(this.$store.state.tab.isCollapse);
        this.$store.commit('changeCollapse');
      }
    }
  }
</script>
<style scoped>
body,html{
  padding: 0;
  margin: 0;
}
.outter {
    height: 60px;
    background-color: #333333;
    clear: both;
}
.leftcontent {
  float: left;
  padding-left: 30px;
}
.rightcontent {
  float: right;
  padding-right: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-button{
  background-color: #545c64;
  border: #545c64;
}
</style>