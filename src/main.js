import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import "./registerServiceWorker";

Raven.config("https://39def78bbaa6426c91ffc5c48d5c245c@sentry.io/1282651")
  .addPlugin(RavenVue, Vue)
  .install();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
