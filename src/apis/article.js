import { request } from "@/utils";

// 获取频道列表，文章类别
export function getChannelAPI(){
    return request({
        url: "/article/category",
        method: "GET",
    })
}

// 提交文章表单
export function createArticleAPI(data){
    return request({
        url: "/article/create",
        method: "POST",
        data: data
    })
}