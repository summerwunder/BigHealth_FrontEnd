/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:28:53
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 20:35:10
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/router/router-table.js
 * @Description: 
 * 2405499352@qq.com
 */
import Login from "../views/login.vue"
const router_table=[
    {
        path:"/login",
        name:"login",
        components:{
            router_main:Login
        }
    },
    {
        path:"/",
        redirect:"/login"
    },
    /*{
        path:"/index",
        components:{
            router_top:Index,
        },
       
    },*/
]
export default router_table