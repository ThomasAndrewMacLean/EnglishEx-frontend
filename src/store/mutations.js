export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setErrorMessage(state, payload) {
    state.errorMessage = payload;
  },
  setLoader(state, payload) {
    state.loading = payload;
  },
  setCurrentExercise(state, payload) {
    state.currentExercise = payload;
    if (payload.type === "A") {
      state.colA = payload.exercise.map(a => a.partA.trim());
      state.colB = payload.exercise.map(a => a.partB.trim());
    }
  },
  changeColB(state, payload) {
    state.colB = payload;
  }
};
