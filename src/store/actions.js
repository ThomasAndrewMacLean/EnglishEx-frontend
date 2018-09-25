let api = 'https://xtdghj4hv0.execute-api.eu-west-1.amazonaws.com/latest';
if (window.location.host === 'localhost:8080') {
    // api = "http://localhost:5001";
}

import router from '../router/router';
import XLSX from 'xlsx';

export default {
    signUserUp({ commit }, payload) {
        commit('setLoader', true);
        fetch(api + '/signup', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            })
        })
            .then(res => res.json())
            .then(j => {
                commit('setLoader', false);

                if (j.token) {
                    localStorage.setItem('token', j.token);
                    //commit("setUser", {
                    //  email: payload.email
                    //});
                    router.push('/confirm');
                } else {
                    commit('setErrorMessage', j.message);
                }
            })
            .catch(err => {
                commit('setLoader', false);
                commit('setErrorMessage', err);
            });
    },
    logUserIn({ commit }, payload) {
        commit('setLoader', true);
        fetch(api + '/login', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            })
        })
            .then(res => res.json())
            .then(j => {
                commit('setLoader', false);

                if (j.token) {
                    localStorage.setItem('token', j.token);
                    commit('setUser', {
                        email: payload.email,
                        isAdmin: j.isAdmin
                    });
                    const redirect =
                        sessionStorage.getItem('setNavigateToAfterSignin') ||
                        '/home';
                    sessionStorage.removeItem('setNavigateToAfterSignin');
                    router.push(redirect);
                } else {
                    commit('setErrorMessage', j.message);
                }
            })
            .catch(err => {
                commit('setErrorMessage', err);
                commit('setLoader', false);
            });
    },
    getNameFromToken({ commit }) {
        commit('setLoader', true);
        return new Promise((resolve, reject) => {
            fetch(api + '/getNameFromToken', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', false);
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    res.json().then(j => {
                        commit('setUser', {
                            email: j.email,
                            isAdmin: j.isAdmin
                        });
                    });
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    confirmUser({ commit }, payload) {

        commit('setLoader', true);
        fetch(api + '/confirm', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },

            method: 'POST',
            body: JSON.stringify({
                code: payload.code
            })
        })
            .then(res => {

                commit('setLoader', false);

                if (res.status === 403) {

                    localStorage.removeItem('token');
                    router.push('/');
                    commit(
                        'setErrorMessage',
                        'The code was wrong, or it took too long to confirm the code. Please try to sign up again. You will receive a new code.'
                    );
                }
                return res.json();
            })
            .then(j => {
                commit('setUser', {
                    email: j.email,
                    isAdmin: j.isAdmin
                });
                // synchroon?
                // of toch al zetten op sing up???
                router.push('/home');
            })
            .catch(err => {
                router.push('/');
                commit('setErrorMessage', err);
                commit('setLoader', false);
            });
    },
    addExercise({ commit }, payload) {
        commit('setLoader', true);
        return new Promise((resolve, reject) => {
            fetch(api + '/addexercise', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    exercise: payload
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('setLoader', false);
                    resolve(j);
                })
                .catch(err => {
                    commit('setLoader', false);
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    addCourse({ commit }, payload) {

        return new Promise((resolve, reject) => {
            fetch(api + '/addcourse', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    course: payload.course
                })
            })
                .then(res => res.json())
                .then(j => {
                    resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    editCourse({ commit }, payload) {

        return new Promise((resolve, reject) => {
            fetch(api + '/editcourse', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    course: payload.course
                })
            })
                .then(res => res.json())
                .then(j => {
                    resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getExercises({ commit }) {
        commit('setLoader', true);
        return new Promise((resolve, reject) => {
            fetch(api + '/exercises', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', false);
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(j => {

                    return resolve(j);
                })
                .catch(err => {
                    commit('setLoader', false);

                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getExercise({ commit }, payload) {
        if (!payload.id) {
            commit('setCurrentExercise', null);
        } else {
            commit('setLoader', true);

            fetch(api + '/exercises/' + payload.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(ex => {
                    commit('setLoader', false);

                    commit('setCurrentExercise', ex[0]);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                });
        }
    },
    getCourses({ commit }) {
        commit('setLoader', true);

        return new Promise((resolve, reject) => {
            fetch(api + '/courses', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', false);

                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(j => {
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getMyPoints({ commit }) {
        return new Promise((resolve, reject) => {
            fetch(api + '/getMyPoints', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(j => {
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },

    getCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            fetch(api + '/course/' + payload.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(j => {
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    clearErrorMessage({ commit }) {
        commit('setErrorMessage', null);
    },
    readExcel({ commit }, payload) {
        commit('setLoader', true);

        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onload = e => {
                const data = e.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(sheetName => {
                    // const Xrowobject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                    const Xrowobject = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheetName]
                    );
                    commit('setLoader', false);
                    return resolve(Xrowobject);
                });
            };
            reader.readAsBinaryString(payload.file);
        });
    },
    getUsers({ commit }) {
        return new Promise((resolve, reject) => {
            fetch(api + '/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    if (res.status !== 200) {
                        commit('setUser', null);
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                        router.push('/');
                    }
                    return res.json();
                })
                .then(j => {
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    changeColB({ commit }, payload) {
        commit('changeColB', payload);
    },
    sendExToServer({ commit }, payload) {
        commit('setLoader', true);
        return new Promise((resolve, reject) => {
            fetch(api + '/saveEx', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', false);

                    if (res.status !== 200) {
                        commit(
                            'setErrorMessage',
                            'make sure you are logged in.'
                        );
                    }
                    return res.json();
                })
                .then(j => {
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    }
};
