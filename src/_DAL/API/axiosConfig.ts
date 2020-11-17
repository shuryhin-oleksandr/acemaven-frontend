import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.common["authorization"] = `JWT ${token}`;
    } else {
      delete config.headers.common["authorization"];
      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.href = "/acemaven";
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default instance;
