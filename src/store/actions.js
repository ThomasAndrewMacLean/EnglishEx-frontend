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
  clearErrorMessage({ commit }) {
    commit("setErrorMessage", null);
  }
};
