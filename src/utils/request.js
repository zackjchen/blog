// axios的封装出来
//  1. 根域名配置
//  2. 超时时间
//  3. 请求拦截器/响应拦截器
import axios from "axios";
const request = axios.create({
    baseURL: 'https://localhost:3000/',
    timeout: 1000,
  });

  // Add a request interceptor
  request.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


  export default request