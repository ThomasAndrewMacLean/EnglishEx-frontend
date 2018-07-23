const api = "https://xtdghj4hv0.execute-api.eu-west-1.amazonaws.com/latest/";
import router from "./../router";

export default {
  signUserUp({ commit }, payload) {
    fetch(api + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    })
      .then(res => res.json())
      .then(j => {
        if (j.token) {
          localStorage.setItem("token", j.token);
          commit("setUser", {
            email: payload.email
          });
          router.push("/home");
        } else {
          commit("setErrorMessage", j.message);
        }
      });
  },
  logUserIn({ commit }, payload) {
    fetch(api + "/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    })
      .then(res => res.json())
      .then(j => {
        if (j.token) {
          localStorage.setItem("token", j.token);
          commit("setUser", {
            email: payload.email
          });
          router.push("/home");
        } else {
          commit("setErrorMessage", j.message);
        }
      });
  },
  addExercise({ commit }, payload) {
    console.log(payload);

    // return new Promise((resolve, reject) => {
    //   // Do something here... lets say, a http call using vue-resource
    //   this.$http("/api/something").then(
    //     response => {
    //       // http success, call the mutator and change something in state
    //       resolve(response); // Let the calling function know that http is done. You may send some data back
    //     },
    //     error => {
    //       // http failed, let the calling function know that action did not work out
    //       reject(error);
    //     }
    //   );
    // });
    return new Promise((resolve, reject) => {
      fetch(api + "/upload", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        method: "POST",
        body: JSON.stringify({
          test: payload
        })
      })
        .then(res => res.json())
        .then(j => {
          resolve(j);
        })
        .catch(err => {
          commit("setErrorMessage", err);
          reject(err);
        });
    });
  },
  clearErrorMessage({ commit }) {
    commit("setErrorMessage", null);
  }
};
