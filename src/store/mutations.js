export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setErrorMessage(state, payload) {
    state.errorMessage = payload;
  },
  setLoader(state, payload) {
    state.loading = payload;
  }
};
