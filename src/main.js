// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import router from './router'
import i18n from './lang'
import store from './store'
import '../static/public/style.css'
import 'vant/lib/index.css';
import { Toast } from 'vant';
// import './assets/js/size.js'
Vue.use(Vant)
Vue.config.productionTip = false;
Vue.prototype.$toast = Toast;

//国际化
Vue.use(i18n)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
