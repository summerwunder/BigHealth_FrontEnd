/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 17:30:15
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-21 14:20:43
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/user/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
export const getUserList=(data)=>{
    return request.get('/user/list',{ 
        params: data
    }
)}
export const createUser=(data)=>{
    return request.post('/user/create',data)
}

export const searchUser=(data)=>{
    return request.get('/user/search',{
        params: {id:data}
    })
}

export const updateUser=(data,idx)=>{
    return request.post('/user/update',data,{
        params:{id:idx}
    })
}