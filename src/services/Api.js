import Storage from "@/helpers/Storage.js";
let cache = {};

export default {
  get(route, options = null, callback = function () {}) {
    this.call("GET", route, options, null, (resp, data) => {
      if (this.is_local()) {
        console.log("GET", resp, data);
      }
      callback(resp, data);
    });
  },

  post(route, body = null, callback = function () {}) {
    this.call("POST", route, null, body, (resp, data) => {
      if (this.is_local()) {
        console.log("POST", resp, data);
      }
      callback(resp, data);
    });
  },

  patch(route, body = null, callback = function () {}) {
    this.call("PATCH", route, null, body, (resp, data) => {
      if (this.is_local()) {
        console.log("PATCH", resp, data);
      }
      callback(resp, data);
    });
  },

  delete(route, body = null, callback = function () {}) {
    this.call("DELETE", route, null, body, (resp, data) => {
      if (this.is_local()) {
        console.log("DELETE", resp, data);
      }
      callback(resp, data);
    });
  },

  async call(
    method,
    route,
    options = null,
    body = null,
    callback = function () {}
  ) {
    let params = "";

    //console.log("cachedEvents", cache);

    let signal = options?.__signal;

    if (options?.__signal) {
      delete options.__signal;
    }

    if (options) {
      params = `?${this.data_to_url(options)}`;
    }

    if (route.startsWith("/")) {
      route = route.slice(1);
    }

    if (route.endsWith("/")) {
      route = route.slice(0, -1);
    }

    let url = `${this.url()}/${route}${params}`;
    console.log("method", method);
    if (method == "GET" && cache[url]) {
      callback(true, cache[url]);
      return true;
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization:
        "admin=" +
        Storage.get("admin-token", "") +
        ",user=" +
        Storage.get("user-token", ""),
    };

    if (body) {
      body = JSON.stringify(body || {});
    }

    let response = await fetch(url, {
      method,
      headers,
      body,
      signal,
    }).catch((err) => {
      console.log("[01]==>", err);
      callback(false, err);
      return false;
    });

    if (response && response.ok) {
      let data = await response.json();
      if (data.error != undefined && data.error != "") {
        console.log("[02]==>", data.error);
        callback(false, data.error);
        return false;
      }

      //Armazena em cache
      cache[url] = data;
      callback(true, data);
      return true;
    } else if (response) {
      let data = await response.json();
      console.log("[03]==>", data.error);
      callback(false, data.error);
      return false;
    }
  },

  url() {
    return import.meta.env.VITE_API_URL;
  },

  is_local() {
    return (
      window && window.location && window.location.hostname === "localhost"
    );
  },

  data_to_url(data) {
    return new URLSearchParams(data).toString();
  },
};
