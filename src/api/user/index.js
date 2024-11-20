/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 17:30:15
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 17:30:48
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/user/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
export const getUserList=(data)=>{
    return request.get('/user/list',{ params: data
    }
)}