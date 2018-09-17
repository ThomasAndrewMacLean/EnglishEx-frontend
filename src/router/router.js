import Vue from 'vue';
import AuthGuard from './auth-guard';
import Router from 'vue-router';
import Landing from './../views/Landing.vue';
import Home from './../views/Home.vue';
import Settings from './../views/Settings.vue';
import Admin from './../views/Admin.vue';
import Confirm from './../views/Confirm.vue';
import Course from './../views/Course.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing
        },
        {
            path: '/confirm',
            name: 'confirm',
            component: Confirm
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            path: '/course/:courseid',
            name: 'course',
            component: Course,
            beforeEnter: AuthGuard
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            beforeEnter: AuthGuard
        }
    ]
});
