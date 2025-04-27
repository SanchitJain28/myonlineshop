import axios from 'axios'
console.log(process.env.REACT_APP_BACKEND_URL)
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL ,
    withCredentials: true
  });