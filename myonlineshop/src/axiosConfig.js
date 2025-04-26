import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'https://instacart-9fh4.onrender.com/',
    withCredentials: true
  });