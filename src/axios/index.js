import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/';

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { plainAxiosInstance };
