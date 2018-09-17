import store from '../store/store';

export default (to, from, next) => {
    if (store.getters.user) {
        next();
    } else if (localStorage.getItem('token')) {
        store.dispatch('getNameFromToken');
        next();
    } else {
        sessionStorage.setItem('setNavigateToAfterSignin', to.fullPath);
        next('/');
    }
};
