// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index'
import 'font-awesome/css/font-awesome.min.css'
import store from './store/index'
// import 'lib-flexible'

//引入Vant组件
import {
  NavBar,
  Tabbar,
  TabbarItem,
  Search,
  Cell,
  CellGroup,
  Icon,
  Button,
  Uploader,
  Panel,
  Toast
} from 'vant';

Vue.use(NavBar).use(Tabbar).use(TabbarItem).use(Search).use(Cell).use(CellGroup).use(Icon).use(Button).use(Uploader).use(Panel).use(Toast);

Vue.config.productionTip = false
Vue.prototype.$api = api //将api模块挂载到全局

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
