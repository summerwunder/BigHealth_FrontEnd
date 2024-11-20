/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:28:45
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 09:36:00
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/router/index.js
 * @Description: 路由
 * 2405499352@qq.com
 */
import { createRouter,createWebHashHistory } from "vue-router";
import router_table from './router-table.js'
import { isAuthenticated } from '@/utils/auth'

const router = createRouter({
    history: createWebHashHistory(),
    routes: router_table
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !isAuthenticated()) {
      // 如果未登录且试图访问受保护页面，则跳转到登录页
      next('/login')
    } else {
      // 允许通过验证的请求继续
      next()
    }
  })
  
export default router