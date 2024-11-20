/*
 * @Author: wagner mingrui@whut.edu.cn
 * @Date: 
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 09:23:46
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/auth/index.js
 * @Description:用户登陆接口
 */
import request from '@/utils/request'


export const login=async (data)=>{
    return request.post('/sys/user/login',data)
}


