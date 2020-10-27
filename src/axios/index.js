import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:3000/api/v1/';
let API_URL = process.env.VUE_APP_API_URL || LOCAL_API_URL;

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const authorizedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

authorizedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.jwt}`
    };
  }
  return config;
});

export { plainAxiosInstance, authorizedAxiosInstance };
