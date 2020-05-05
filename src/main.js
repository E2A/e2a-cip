import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";
import i18n from "./i18n";
import VeeValidate from "vee-validate";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

// Add validation
Vue.use(VeeValidate, {
  events: "change",
});

// Add analytics
Vue.use(VueAnalytics, {
  id: "UA-126405331-1",
  router,
});

// Add an event hub
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
