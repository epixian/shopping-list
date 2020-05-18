import Vue from 'vue';
import App from './App.vue';

import './style.css';
import store from './store'

import 'animate.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
