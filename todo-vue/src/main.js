import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import store from './store' // vuex와 관련

Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store,  // vuex와 관련
  render: h => h(App)
}).$mount('#app')
