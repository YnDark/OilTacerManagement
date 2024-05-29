<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <TopMenu></TopMenu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from '../components/LeftMenu.vue'
import TopMenu from '../components/TopMenu.vue'
export default {
  name: 'Layout',
  components: {
    LeftMenu,
    TopMenu
  },
}
</script>

<style lang="less" scoped>
.el-header, .el-footer {
    /* background-color: #B3C0D1;
    color: #333; */
    text-align: center;
    line-height: 60px;
    padding: 0;
    margin: 0;
  }
  
  .el-aside {
    /* background-color: #D3DCE6;
    color: #333; */
    text-align: center;
    line-height: 150px;
    padding: 0;
    margin: 0;
  }
  
  .el-main {
    /* background-color: #E9EEF3;
    color: #333; */
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container {
    height: 100vh;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
