import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "./Auth";

const http = axios.create();

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    if (Auth.getToken()) {
      config.headers["Authorization"] = "Bearer " + Auth.getToken();
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a request interceptor
http.interceptors.response.use(
  function (response) {
    notify(response.headers);
    return response;
  },
  function (error) {
    // Do something with request error
    let errorMsg = error.response.data.error || error.response.headers["x-message-error"];
    if (errorMsg) {
      toast.error(errorMsg);
    }
    return Promise.reject(error);
  }
);

const notify = (headers: any) => {
  if (headers["x-message-success"]) {
    toast.success(headers["x-message-success"]);
  }
};

export default http;