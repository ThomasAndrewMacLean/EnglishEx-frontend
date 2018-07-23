import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    navigateToAfterSignin: null,
    appName: "English Exercises",
    errorMessage: null
  },
  mutations,
  actions,
  getters //,
  // plugins: [createPersistedState()]
});
