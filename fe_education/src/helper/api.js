import config from "../config";
import { showToast } from "zmp-sdk/apis";

class ApiServer {
  async call(cmd, args = {}, method = "") {
    if (!method) method = Object.keys(args).length === 0 ? "GET" : "POST";
    let url = config.apiServer + "/" + cmd;
    if (Object.keys(args).length && method === "GET") {
      url += "?" + new URLSearchParams(args).toString();
    }
    const headers = {};
    if (window.$stores?.user?.token)
      headers["Authorization"] = "Bearer " + window.$stores.user.token;
    const options =
      method === "GET"
        ? { headers }
        : {
            method,
            headers: {
              ...headers,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
          };
    return fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          showToast({
            message: res.error.message,
          });
        }
        return res;
      })
      .catch((e) => {
        showToast({
          message: e.message,
        });
        throw e;
      });
  }

  async currentUser(user) {
    return this.call("user/info", user)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        return res;
      })
      .catch((e) => {
        localStorage.removeItem("token");
      });
  }
}

export default {
  install: (app, options) => {
    window.$api = new ApiServer();
    app.config.globalProperties.$api = window.$api;
  },
};
