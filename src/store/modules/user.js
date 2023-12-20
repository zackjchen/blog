import {request} from "@/utils";
import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
    name: "user",
    initialState:{
        token: localStorage.getItem('token_key')||""
    },
    reducers: {
        setToken(state,action){
            console.log("payload",action.payload);
            state.token = action.payload
            localStorage.setItem('token_key', action.payload)
        }
    }
})

const {setToken, getToken} = userStore.actions
const userReducer = userStore.reducer


// 完成登陆获取token
const featchLogin =  (loginForm, navgate, message)=>{


    return async (dispath)=>{
        try{
            const res = await request.post("/user/login", loginForm)
            const data = JSON.parse(res.data)
            if(data.status_code === 200){
                dispath(setToken(data.token))
                navgate("/system")
                message.success("登陆成功")
            }else{
                message.error("密码或账号不正确")
            }
        }catch(err){
            console.log(err)
            message.error("网络错误, 请稍后重试....")

        }

    }

}


export{ setToken ,featchLogin ,getToken}
export default userReducer