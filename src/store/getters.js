export default {
    user(state) {
        return state.user;
    },
    errorMessage(state) {
        return state.errorMessage;
    },
    loading(state) {
        return state.loading.length > 0;
    },
    appName(state) {
        return state.appName;
    },
    navigateToAfterSignin(state) {
        return state.navigateToAfterSignin;
    },
    getCurrentExercise(state) {
        return state.currentExercise;
    },
    getColA(state) {
        return state.colA;
    },
    getColB(state) {
        return state.colB;
    },
    getLabels(state) {
        return state.labels;
    },
    getShowLabels(state) {
        return state.showLabels;
    },
    getCategories(state) {
        return state.categories;
    },
    getCourses(state) {
        return state.courses;
    }
};
