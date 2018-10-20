import Raven from 'raven-js';

export default {
    setUser(state, payload) {
        Raven.setUserContext({
            email: payload.email
        });

        state.user = payload;
    },
    setErrorMessage(state, payload) {
        state.loading = [];
        state.errorMessage = payload;
    },
    setLoader(state, payload) {
        if (payload.add) {
            state.loading.push(payload.name);
        } else {
            state.loading.splice(state.loading.indexOf(payload.name), 1);
        }
    },
    setLabels(state, payload) {
        state.labels = payload;
    },
    addLabel(state, payload) {
        state.labels.push(payload);
    },
    setCurrentExercise(state, payload) {
        if (payload === null) {
            state.currentExercise = null;
            state.colA = null;
            state.colB = null;
        } else {
            state.currentExercise = payload;
            if (payload.type === 'A') {
                state.colA = payload.exercise.map(a => a.partA.trim());
                state.colB = payload.exercise.map(a => a.partB.trim());
            }
            if (payload.type === 'B') {
                state.colA = payload.exercise.map(a => ({
                    ex: a.partA.trim(),
                    ans: ''
                }));
                state.colB = null;
            }
            if (payload.type === 'C') {
                state.colA = payload.exercise.map(a => ({
                    ex: a.partA.trim(),
                    ans: ''
                }));
                state.colB = null;
            }
        }
    },
    changeColB(state, payload) {
        state.colB = payload;
    },
    toggleShowLabels(state) {
        state.showLabels = !state.showLabels;
    }
};
