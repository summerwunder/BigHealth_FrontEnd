/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-21 15:21:16
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 17:05:01
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/checkUser/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
export const getCheckUserList=(data)=>{
    return request.get('/checkUser/list',{ 
        params: data
    }
)}

export const addCheckUser = (data,id) => {
    return request.post(`/checkUser/add/${id}`, data)
}

export const searchCheckUser = (data) => {
    return request.get('/checkUser/search', { 
        params: data
    })
}

  // 删除体检人
export const deleteCheckUser = (id) => {
    return request.delete(`/checkUser/delete/${id}`);
};
  
export const updateCheckUser = (data,idx) => {
    return request.post('/checkUser/update', data,{
        params:{id:idx}
    })
}

export const fetchDetailsById = (id) => {
    return request.get(`/checkUser/details/${id}`);
  };

export const getUserIdByCheckUser = (id)=>{
    return request.get('/checkUser/userId',{
        params:{id:id} 
    });
}