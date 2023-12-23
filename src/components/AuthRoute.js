// 有token正常跳转，无token去登陆


import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export default function AuthRoute({children}){
    const token = getToken()
    // console.log("child",children)
    if(token){
        return children
    }else{
        return <Navigate to={"/login"} replace/>
    }
}

