let api = "https://xtdghj4hv0.execute-api.eu-west-1.amazonaws.com/latest";
if (window.location.host === "localhost:8080") {
  api = "http://localhost:5001";
}

import router from "../router/router";
import XLSX from "xlsx";

export default {
  signUserUp({ commit }, payload) {
    commit("setLoader", true);
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
        commit("setLoader", false);
        console.log(j);

        if (j.token) {
          localStorage.setItem("token", j.token);
          //commit("setUser", {
          //  email: payload.email
          //});
          router.push("/confirm");
        } else {
          commit("setErrorMessage", j.message);
        }
      })
      .catch(err => {
        commit("setLoader", false);
        commit("setErrorMessage", err);
      });
  },
  logUserIn({ commit }, payload) {
    commit("setLoader", true);
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
        commit("setLoader", false);
        console.log(j);

        if (j.token) {
          localStorage.setItem("token", j.token);
          commit("setUser", {
            email: payload.email,
            isAdmin: j.isAdmin
          });
          const redirect =
            sessionStorage.getItem("setNavigateToAfterSignin") || "/home";
          sessionStorage.removeItem("setNavigateToAfterSignin");
          router.push(redirect);
        } else {
          commit("setErrorMessage", j.message);
        }
      })
      .catch(err => {
        commit("setErrorMessage", err);
        commit("setLoader", false);
      });
  },
  confirmUser({ commit }, payload) {
    console.log(payload.code);

    commit("setLoader", true);
    fetch(api + "/confirm", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },

      method: "POST",
      body: JSON.stringify({
        code: payload.code
      })
    })
      .then(res => {
        console.log(res);

        commit("setLoader", false);

        if (res.status === 403) {
          console.log("should not be hiereee!!!");

          localStorage.removeItem("token");
          router.push("/");
          commit(
            "setErrorMessage",
            "The code was wrong, or it took too long to confirm the code. Please try to sign up again. You will receive a new code."
          );
        }
        return res.json();
      })
      .then(j => {
        console.log("go to home!!");

        commit("setUser", {
          email: j.email,
          isAdmin: j.isAdmin
        });
        // synchroon?
        // of toch al zetten op sing up???
        router.push("/home");
      })
      .catch(err => {
        router.push("/");
        commit("setErrorMessage", err);
        commit("setLoader", false);
      });
  },
  addExercise({ commit }, payload) {
    return new Promise((resolve, reject) => {
      fetch(api + "/addexercise", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },

        method: "POST",
        body: JSON.stringify({
          exercise: payload
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
  addCourse({ commit }, payload) {
    console.log(payload);

    return new Promise((resolve, reject) => {
      fetch(api + "/addcourse", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },

        method: "POST",
        body: JSON.stringify({
          course: payload.course
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
  getExercises({ commit }) {
    return new Promise((resolve, reject) => {
      fetch(api + "/exercises", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET"
      })
        .then(res => {
          console.log(res);

          if (res.status !== 200) {
            commit("setUser", null);
            commit("setErrorMessage", "make sure you are logged in.");
            router.push("/");
          }
          return res.json();
        })
        .then(j => {
          console.log(j);

          return resolve(j);
        })
        .catch(err => {
          commit("setErrorMessage", err);
          reject(err);
        });
    });
  },
  getCourses({ commit }) {
    return new Promise((resolve, reject) => {
      fetch(api + "/courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET"
      })
        .then(res => {
          if (res.status !== 200) {
            commit("setUser", null);
            commit("setErrorMessage", "make sure you are logged in.");
            router.push("/");
          }
          return res.json();
        })
        .then(j => {
          return resolve(j);
        })
        .catch(err => {
          commit("setErrorMessage", err);
          reject(err);
        });
    });
  },
  getCourse({ commit }, payload) {
    return new Promise((resolve, reject) => {
      fetch(api + "/course/" + payload.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET"
      })
        .then(res => {
          if (res.status !== 200) {
            commit("setUser", null);
            commit("setErrorMessage", "make sure you are logged in.");
            router.push("/");
          }
          return res.json();
        })
        .then(j => {
          return resolve(j);
        })
        .catch(err => {
          commit("setErrorMessage", err);
          reject(err);
        });
    });
  },
  clearErrorMessage({ commit }) {
    commit("setErrorMessage", null);
  },
  readExcel({ commit }, payload) {
    commit("setLoader", true);

    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary"
        });
        workbook.SheetNames.forEach(sheetName => {
          // const Xrowobject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          console.log(sheetName);

          const Xrowobject = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          );
          commit("setLoader", false);
          return resolve(Xrowobject);
        });
      };
      reader.readAsBinaryString(payload.file);
    });
  }
};
