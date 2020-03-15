// Plug-ins
import VModal from 'vue-js-modal';
// Vue related imports
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
// App setups on independent files
import FontAwesomeIcon from './utils/fontAwesome';

// Register plug-ins
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VModal, { dynamic: true });
Vue.config.productionTip = false;

// Initialize App
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
