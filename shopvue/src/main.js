import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Filter: shows a number as money, for example 9.5 -> $9.50
Vue.filter('money', (value) => '$' + Number(value).toFixed(2))

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')