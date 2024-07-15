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
      v-for="e in HeadData"
      :key="e.name"
      :index="e.name"
    >
      <!-- <i v-bind:class = "`iconfont icon-` + e.icon "></i> -->
      <template slot="title">{{ isCollapse ? "数据" : "全部数据" }}</template>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">{{ isCollapse ? "油溶性" : "油溶性示踪剂图" }}</template>
      <el-menu-item
        @click="jump(e)"
        v-for="e in OilMenuData"
        :key="e.name"
        :index="e.name"
      >
        <!-- <i v-bind:class = "`iconfont icon-` + e.icon "></i> -->
        <span slot="title">{{ e.label }}</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">{{ isCollapse ? "水溶性" : "水溶性示踪剂图" }}</template>
      <el-menu-item
        @click="jump(e)"
        v-for="e in WaterMenuData"
        :key="e.name"
        :index="e.name"
      >
        <!-- <i v-bind:class = "`iconfont icon-` + e.icon "></i> -->
        <span slot="title">{{ e.label }}</span>
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
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
.el-menu-item{
  font-size: 12;
}

</style>

<script>
export default {
  data() {
    return {
      HeadData:
      [{
          path: "/ActivityAudit",
          name: "ActivityAudit",
          label: "全部数据",
          icon: "biaoge",
          url: "",
      }],
      OilMenuData: [
        {
          path: "/QualificationAudit/OilBarByAll",
          name: "OilBarByAll",
          label: "产油量贡献图",
          icon: "tubiaozhuzhuangtu",
          url: "",
        },
        {
          path: "/QualificationAudit/OilBarByDay",
          name: "OilBarByDay",
          label: "瞬时产油量贡献图",
          icon: "tubiaozhuzhuangtu",
          url: "",
        },
        {
          path: "/Setting/OilLineByColDay",
          name: "OilLineByColDay",
          label: "油溶性示踪剂产出浓度图",
          icon: "zhexiantu",
          url: "",
        },
        {
          path: "/Setting/OilLineByMessDay",
          name: "OilLineByMessDay",
          label: "油溶性示踪剂瞬时产出图",
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
      WaterMenuData: [
        // {
        //   path: "/QualificationAudit/WaterBarByAll",
        //   name: "WaterBarByAll",
        //   label: "每日柱状图",
        //   icon: "tubiaozhuzhuangtu",
        //   url: "",
        // },
        {
          path: "/QualificationAudit/WaterBarByDay",
          name: "WaterBarByDay",
          label: "瞬时产水量贡献图",
          icon: "tubiaozhuzhuangtu",
          url: "",
        },
        {
          path: "/Setting/WaterLineByColDay",
          name: "WaterLineByColDay",
          label: "水溶性示踪剂浓度折线",
          icon: "zhexiantu",
          url: "",
        },
        {
          path: "/Setting/WaterLineByMessDay",
          name: "WaterLineByMessDay",
          label: "水溶性示踪剂瞬时产出结果图",
          icon: "zhexiantu",
          url: "",
        },
        {
          path: "/Setting/WaterLineByVDay",
          name: "WaterLineByVDay",
          label: "水溶性示踪剂累计回采率图",
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