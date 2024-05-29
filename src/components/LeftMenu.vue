<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "管理" : "后台管理系统" }}</h3>
    <el-menu-item
      @click="jump(e)"
      v-for="e in MenuData"
      :key="e.name"
      :index="e.name"
    >
      <!-- <i class="el-icon-s-tools"></i> -->
      <i v-bind:class = "`iconfont icon-` + e.icon "></i>
      <span slot="title">{{ e.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border-right: none;
  h3 {
    background-color: #545c64;
    color: #fff;
    line-height: 100px;
    text-align: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      MenuData: [
        {
          path: "/ActivityAudit",
          name: "ActivityAudit",
          label: "全部数据",
          icon: "biaoge",
          url: "",
        },
        {
          path: "/QualificationAudit",
          name: "QualificationAudit",
          label: "柱状图",
          icon: "tubiaozhuzhuangtu",
          url: "",
        },
        {
          path: "/Setting",
          name: "Setting",
          label: "折线图",
          icon: "zhexiantu",
          url: "",
        },
        {
          path: "/PieChart",
          name: "PieChart",
          label: "饼状图",
          icon: "bingzhuangtucopy",
          url: "",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    jump(e) {
      this.$router.push({ path: e.path, name: e.name });
      /* console.log(e.path) */
    },
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>