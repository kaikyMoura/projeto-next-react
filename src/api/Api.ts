//import axios from "axios";
import Axios, { AxiosRequestConfig } from "axios";

const options: AxiosRequestConfig = {
    baseURL: 'http://localhost:8089'
}

const api = Axios.create(options)

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   }, error => {
//     return Promise.reject(error);
//   });

export default api;