import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from './store'
import i18n from './i18n'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

// Add validation
Vue.use(VeeValidate, {
  events: 'change'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
