import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/';

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
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      Authorization: localStorage.jwt
    };
  }
  return config;
});

export { plainAxiosInstance, authorizedAxiosInstance };
