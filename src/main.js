import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import vuerouter  from 'vue-router'
import store from './store';
import 'echarts';
import Echarts from 'vue-echarts';
import moment from 'moment';

Vue.prototype.$moment = moment
Vue.component("Echarts",Echarts);
Vue.use(vuerouter);
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
