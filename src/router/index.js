/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:28:45
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 20:29:02
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/router/index.js
 * @Description: 路由
 * 2405499352@qq.com
 */
import { createRouter,createWebHashHistory } from "vue-router";
import router_table from './router-table.js'


const router = createRouter({
    history: createWebHashHistory(),
    routes: router_table
})

export default router