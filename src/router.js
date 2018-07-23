import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ]
});
