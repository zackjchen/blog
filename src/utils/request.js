// axios的封装出来
//  1. 根域名配置
//  2. 超时时间
//  3. 请求拦截器/响应拦截器
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

const request = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
  });

  // Add a request interceptor
  request.interceptors.request.use(function (config) {
    // 注入token
    // 
    const token = getToken()
    // console.log("aaaa",token);
    if (token){
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // 监控401 token失效
    // console.dir("拦截到401error", error)
    if(error.response.status === 401){
      removeToken()
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error);
  });


  export default request