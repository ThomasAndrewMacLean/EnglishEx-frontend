import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        loading: false,
        error: null,
        navigateToAfterSignin: null,
        appName: 'End Training',
        errorMessage: null,
        currentExercise: null,
        colA: null,
        colB: null,
        labels: [],
        showLabels: true
    },
    mutations,
    actions,
    getters //,
    // plugins: [createPersistedState()]
});
