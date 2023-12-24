// 封装与用户相关的所有请求
import { request } from "@/utils";

// 1.登陆请求
export function loginAPI(formData){
    return request({
        url: "/user/login",
        method: "POST",
        data: formData
    })
}

// 1.获取个人信息
export function getProfileAPI(){
    return request({
        url: "/user/profile",
        method: "GET",
    })
}