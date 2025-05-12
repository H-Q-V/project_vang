class ApiServer {
  async call(cmd, args = {}, method = "") {
    if (!method) method = Object.keys(args).length === 0 ? "GET" : "POST";
    let url = import.meta.env.VITE_BE_URL + "/" + cmd;
    if (Object.keys(args).length && method === "GET") {
      url += "?" + new URLSearchParams(args).toString();
    }
    const headers = {};
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = "Bearer " + token;
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
          // showToast({
          //     message: res.error.message
          // });
        }
        return res;
      })
      .catch((e) => {
        // showToast({
        //     message: e.message
        // });
        throw e;
      });
  }
}

export default {
  install: (app, options) => {
    window.$api = new ApiServer();
    app.config.globalProperties.$api = window.$api;
  },
};
