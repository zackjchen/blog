// 封装token的存取方法


const TOKENKEY = 'token_key'
function setToken(token) {
    localStorage.setItem(TOKENKEY, token)
}

function getToken(){
    return localStorage.getItem(TOKENKEY)
}

function removeToken(){
    console.log("移除token");
    localStorage.removeItem(TOKENKEY)
}

export{
    setToken,getToken,removeToken
}