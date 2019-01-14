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
                state.colA = payload.exercise.map(a =>
                    a.partA.toString().trim()
                );
                state.colB = payload.exercise.map(a =>
                    a.partB.toString().trim()
                );
            }
            if (payload.type === 'B') {
                state.colA = payload.exercise.map(a => ({
                    ex: a.partA.toString().trim(),
                    ans: ''
                }));
                state.colB = null;
            }
            if (payload.type === 'C') {
                state.colA = payload.exercise.map(a => ({
                    ex: a.partA.toString().trim(),
                    ans: ''
                }));
                state.colB = null;
            }
            if (payload.type === 'D') {
                state.colA = payload.exercise.map(a =>
                    a.partA.toString().trim()
                );
                state.colB = payload.exercise.map(a => ({
                    button1: a.button1,
                    button2: a.button2,
                    button3: a.button3,
                    button4: a.button4
                }));
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
