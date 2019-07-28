let api = 'https://xtdghj4hv0.execute-api.eu-west-1.amazonaws.com/latest';
if (window.location.host === 'localhost:8080') {
    // api = "http://localhost:5001";
}

import router from '../router/router';
import XLSX from 'xlsx';

export default {
    setErrorMessage({ commit }, payload) {
        router.push('/');
        commit('setErrorMessage', payload.message);
    },
    signUserUp({ commit }, payload) {
        commit('setLoader', { add: true, name: 'signUserUp' });
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
                commit('setLoader', { add: false, name: 'signUserUp' });

                if (j.token) {
                    localStorage.setItem('token', 'Bearer ' + j.token);
                    //commit("setUser", {
                    //  email: payload.email
                    //});
                    router.push('/confirm');
                } else {
                    commit('setErrorMessage', j.message);
                }
            })
            .catch(err => {
                commit('setLoader', { add: false, name: 'signUserUp' });
                commit('setErrorMessage', err);
            });
    },
    logUserIn({ commit }, payload) {
        commit('setLoader', { add: true, name: 'logUserIn' });
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
                commit('setLoader', { add: false, name: 'logUserIn' });

                if (j.token) {
                    localStorage.setItem('token', 'Bearer ' + j.token);
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
                commit('setLoader', { add: false, name: 'logUserIn' });
            });
    },
    getNameFromToken({ commit }) {
        commit('setLoader', true);
        return new Promise((resolve, reject) => {
            fetch(api + '/getNameFromToken', {
                headers: {
                    Authorization: localStorage.getItem('token')
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
                Authorization: localStorage.getItem('token')
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
        commit('setLoader', { add: true, name: 'addExercise' });
        return new Promise((resolve, reject) => {
            fetch(api + '/addexercise', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    exercise: payload
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('setLoader', { add: false, name: 'addExercise' });
                    resolve(j);
                })
                .catch(err => {
                    commit('setLoader', { add: false, name: 'addExercise' });
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
                    Authorization: localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    course: payload.course
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('addCourse', j);
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
                    Authorization: localStorage.getItem('token')
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
        commit('setLoader', { add: true, name: 'getExercises' });
        return new Promise((resolve, reject) => {
            fetch(api + '/exercises', {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'getExercises' });
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
                    commit('setLoader', { add: false, name: 'getExercises' });

                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getExercise({ commit }, payload) {
        if (!payload.id) {
            commit('setCurrentExercise', null);
        } else {
            commit('setLoader', { add: true, name: 'getExercise' });

            fetch(api + '/exercises/' + payload.id, {
                headers: {
                    Authorization: localStorage.getItem('token')
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
                    commit('setLoader', { add: false, name: 'getExercise' });

                    commit('setCurrentExercise', ex[0]);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                });
        }
    },
    getCourses({ commit, state }) {
        if (state.courses.length) {
            return;
        }
        commit('setLoader', { add: true, name: 'getCourses' });

        return new Promise((resolve, reject) => {
            fetch(api + '/courses', {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'getCourses' });

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
                    commit('setCourses', j);
                    return resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getMyPoints({ commit }, payload) {
        return new Promise((resolve, reject) => {
            fetch(api + '/getMyPoints', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: payload }),
                method: 'POST'
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
    showLoader({ commit }, payload) {
        commit('setLoader', { add: payload.add, name: payload.name });
    },
    getCourse({ commit }, payload) {
        commit('setLoader', { add: true, name: 'getCourse' });

        return new Promise((resolve, reject) => {
            fetch(api + '/course/' + payload.id, {
                headers: {
                    Authorization: localStorage.getItem('token')
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
                    commit('setLoader', { add: false, name: 'getCourse' });
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
        commit('setLoader', { add: true, name: 'readExcel' });

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
                    commit('setLoader', { add: false, name: 'readExcel' });
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
                    Authorization: localStorage.getItem('token')
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
    changeUserName({ commit }, payload) {
        commit('setUser', payload);
    },
    getLabels({ commit }) {
        commit('setLoader', { add: true, name: 'getLabels' });
        return new Promise((resolve, reject) => {
            fetch(api + '/getLabels', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'getLabels' });
                    return res.json();
                })
                .then(j => {
                    commit('setLabels', j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    updateLabel({ commit }, payload) {
        commit('setLoader', { add: true, name: 'updateLabel' });
        return new Promise((resolve, reject) => {
            fetch(api + '/updateLabel', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'updateLabel' });
                    return res.json();
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    addLabel({ commit }, payload) {
        commit('setLoader', { add: true, name: 'addLabel' });
        return new Promise((resolve, reject) => {
            fetch(api + '/newLabel', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'addLabel' });

                    return res.json();
                })
                .then(j => {
                    commit('addLabel', j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    getAnswer({ commit }, payload) {
        commit('setLoader', { add: true, name: 'getAnswer' });
        return new Promise((resolve, reject) => {
            fetch(api + '/getAnswer', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'getAnswer' });

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
    },
    sendExToServer({ commit }, payload) {
        commit('setLoader', { add: true, name: 'sendExToServer' });
        return new Promise((resolve, reject) => {
            fetch(api + '/saveEx', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'sendExToServer' });

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
    },
    sendExBToServer({ commit }, payload) {
        commit('setLoader', { add: true, name: 'sendExBToServer' });
        return new Promise((resolve, reject) => {
            fetch(api + '/saveExB', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => {
                    commit('setLoader', {
                        add: false,
                        name: 'sendExBToServer'
                    });

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
    },
    toggleShowLabels({ commit }) {
        commit('toggleShowLabels');
    },
    getCategories({ commit, state }) {
        if (state.categories.length) {
            return;
        }
        commit('setLoader', { add: true, name: 'getCategories' });
        return new Promise((resolve, reject) => {
            fetch(api + '/getCategories', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
                .then(res => {
                    commit('setLoader', { add: false, name: 'getCategories' });
                    return res.json();
                })
                .then(j => {
                    commit('setCategories', j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    addCategory({ commit }, payload) {
        commit('setLoader', { add: true, name: 'addCategory' });

        return new Promise((resolve, reject) => {
            fetch(api + '/addCategory', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    category: payload.category
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('addCategory', j);
                    resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    updateCategory({ commit }, payload) {
        commit('setLoader', { add: true, name: 'updateCategory' });
        return new Promise((resolve, reject) => {
            fetch(api + '/editCategory', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    category: payload.category
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('setLoader', { add: false, name: 'updateCategory' });
                    resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    },
    deleteCategory({ commit }, payload) {
        commit('setLoader', { add: true, name: 'deleteCategory' });
        return new Promise((resolve, reject) => {
            fetch(api + '/deleteCategory', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                },

                method: 'POST',
                body: JSON.stringify({
                    category: payload.category
                })
            })
                .then(res => res.json())
                .then(j => {
                    commit('setLoader', { add: false, name: 'deleteCategory' });
                    resolve(j);
                })
                .catch(err => {
                    commit('setErrorMessage', err);
                    reject(err);
                });
        });
    }
};
