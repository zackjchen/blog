import {removeToken, request} from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken } from "@/utils";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState:{
        token: localStorage.getItem('token_key')||"",
        userInfo: {}
    },
    // 修改数据状态的放法
    reducers: {
        setToken(state,action){
            // console.log("payload",action.payload);
            state.token = action.payload
            // localStorage.setItem('token_key', action.payload)
            _setToken(action.payload)
        },
        setUserInfo(state, action){
            state.userInfo = action.payload
        },
        // 退出登陆时，清除共享的状态数据
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()//这里是本地缓存的数据清除
        },
    }
})

const {setToken, setUserInfo, clearUserInfo} = userStore.actions
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
//  获取个人信息的异步方法
const featchUserInfo =  (navgate)=>{
    return async (dispath)=>{
            request.get('/user/profile').then(
                (data)=>{
                    console.log(data.data);
                    dispath(setUserInfo(JSON.parse(data.data)))
                }
            ).catch(
                (err)=>{ 
                    console.log(err);
                    // navgate("/login")
                }
            )
            // console.log(JSON.parse(res.data));
            // dispath(setUserInfo(JSON.parse(res.data)))
        }
}
export{ setToken, setUserInfo, clearUserInfo,featchLogin, featchUserInfo }
export default userReducer