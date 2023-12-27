//封装获取频道列表的逻辑

// 封装所有自定义hook的流程
// 1。创建一个use开头的函数
// 2. 在函数中封装业务逻辑，return组件要使用的数据
// 3. 组件中导入函数执行并结构状态数据


import { useState,useEffect } from "react"
import { getChannelAPI } from "@/apis/article"
export default function useChannelList(){
        // 获取频道列表
        const [channelList, setChannelList] = useState([])
        useEffect(
            ()=>{
                // 1。封装函数，调用接口
                const getChannelList =  async ()=>{
                    const res = await getChannelAPI()
                    setChannelList(JSON.parse(res.data))
                }
                // 调用函数
                getChannelList()
            },[]
        )

        return {channelList}
}