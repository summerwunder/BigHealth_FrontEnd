/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:28:53
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 21:25:38
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/router/router-table.js
 * @Description: 
 * 2405499352@qq.com
 */
import Login from "../views/login.vue"
import Index from "../layout/index.vue"
const router_table=[
    {
        path:"/login",
        name:"login",
        components:{
            router_app:Login
        }
    },
    {
        path:"/",
        redirect:"/login"
    },
    {
        path:"/index",
        components:{
            router_app:Index,
        },
       
    },
]
export default router_table