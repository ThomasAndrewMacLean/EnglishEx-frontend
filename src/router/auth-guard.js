import store from "../store/store";

export default (to, from, next) => {
  if (store.getters.user) {
    next();
  } else {
    sessionStorage.setItem("setNavigateToAfterSignin", to.fullPath);
    next("/");
  }
};
