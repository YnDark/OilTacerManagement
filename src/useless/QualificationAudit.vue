<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item @click="jump(e)"
      v-for="e in MenuData"
      :key="e.name"
      :index="e.name">{{ e.label }}</el-menu-item>
  </el-menu>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'QualificationAudit',
  components: {
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to, from) {
        // 在路由变化时执行重新创建组件的操作
        this.$destroy();
        this.$router.push(to.path);
      }
    }
  },
  data(){
    return{
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
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

}
</script>

<style lang="less" scoped>
  
</style>
