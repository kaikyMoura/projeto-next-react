import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8089',
})

api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('Token');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

export default api;