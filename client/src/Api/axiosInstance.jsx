import axios from "axios";
// import { getAuthToken } from "../util/utility";
export const host = "https://authentication-3c37.onrender.com";
// export const host = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: host,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "jetToken";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
