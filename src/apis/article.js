import { request } from "@/utils";

// 获取频道列表，文章类别
export function getChannelAPI(){
    return request({
        url: "/articles/category",
        method: "GET",
    })
}

// 提交文章表单
export function createArticleAPI(data){
    return request({
        url: "/articles/create",
        method: "POST",
        data: data
    })
}

// 获取文章列表
export function getArticlesAPI(params){
    return request({
        url: "/articles/list",
        method: "GET",
        params
    })
}

// 删除一个文章
export function deleteArticlesAPI(id){
    return request({
        url: `/articles/delete/${id}`,
        method: "POST",
    })
}

// 获取文章详情
export function getArticleById(id){
    return request({
        url:`articles/detail/${id}`
    })
}