/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-21 15:21:16
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-21 16:23:01
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

export const addCheckUser = (data) => {
    return request.post('/checkUser/add', data)
  }