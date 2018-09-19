import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import VueAnalytics from 'vue-analytics';
import './registerServiceWorker';

//SET UP GOOGLE ANALYTICS AND SENTRY ERROR LOGGING
console.log('Setting up Sentry 🤖');
if (window.location.host === 'end-training.com') {
    Raven.config('https://39def78bbaa6426c91ffc5c48d5c245c@sentry.io/1282651')

        .addPlugin(RavenVue, Vue)
        .install();
    // Raven.captureException("hllo world! 🤖");

    Vue.use(VueAnalytics, {
        id: 'UA-110018468-6',
        router
    });
}
//Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
