const tokenKey="ray-token"

export function setToken(token){
    sessionStorage.setItem(tokenKey,token)
}

export function getToken(){
    return sessionStorage.getItem(tokenKey)
}

export function removeToken(){
    if(getToken()){
        return sessionStorage.removeItem(tokenKey)
    }
    return null
}