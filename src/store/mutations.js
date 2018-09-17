import Raven from "raven-js";

export default {
  setUser(state, payload) {
    Raven.setUserContext({
      email: payload.email
    });

    state.user = payload;
  },
  setErrorMessage(state, payload) {
    state.loading = false;
    state.errorMessage = payload;
  },
  setLoader(state, payload) {
    state.loading = payload;
  },
  setCurrentExercise(state, payload) {
    if (payload === null) {
      state.currentExercise = null;
      state.colA = null;
      state.colB = null;
    } else {
      state.currentExercise = payload;
      if (payload.type === "A") {
        state.colA = payload.exercise.map(a => a.partA.trim());
        state.colB = payload.exercise.map(a => a.partB.trim());
      }
    }
  },
  changeColB(state, payload) {
    state.colB = payload;
  }
};
