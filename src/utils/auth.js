/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 09:31:58
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 22:56:59
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/utils/auth.js
 * @Description: 检验用户是否已经登陆
 * 2405499352@qq.com
 */

export const userInfo = {
    username: 'admin',
    role: 'admin', 
    isAuthenticated: false, 
  }
  
  // 检查是否登录
  export function isAuthenticated() {
    return userInfo.isAuthenticated
  }