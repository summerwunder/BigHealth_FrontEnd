/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:28:53
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-22 10:19:44
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
        children: [
            {
                path: '',         
                redirect:'/index/user/user'
            },
            // 用户管理相关路由
            {
              path: 'user/user',
              components: {
                router_main: () => import('@/views/user/user.vue'),
              },
            },
            {
              path: 'user/check',
              components: {
                router_main: () => import('@/views/user/check.vue'),
              },
            },
            {
              path: 'mall/product',
              components: {
                router_main: () => import('@/views/mall/product.vue'),
              },
            },
            {
              path: 'product/details/:id',
              props: true,
              components: {
                router_main: () => import('@/views/mall/productDetails.vue'),
              },
            }
            /*
            
            // 商城管理相关路由
            {
              path: 'mall/category',
              components: {
                router_main: () => import('@/views/mall/category.vue'),
              },
            },
            {
              path: 'mall/project',
              components: {
                router_main: () => import('@/views/mall/project.vue'),
              },
            },
            
            {
              path: 'mall/flash',
              components: {
                router_main: () => import('@/views/mall/flash.vue'),
              },
            },
            {
              path: 'mall/healthCard',
              components: {
                router_main: () => import('@/views/mall/healthCard.vue'),
              },
            },
            // 订单管理相关路由
            {
              path: 'order/list',
              components: {
                router_main: () => import('@/views/order/list.vue'),
              },
            },
            {
              path: 'order/reservation',
              components: {
                router_main: () => import('@/views/order/reservation.vue'),
              },
            },
            // 内容管理相关路由
            {
              path: 'content/banner',
              components: {
                router_main: () => import('@/views/content/banner.vue'),
              },
            },
            {
              path: 'content/recommend',
              components: {
                router_main: () => import('@/views/content/recommend.vue'),
              },
            },
            {
              path: 'content/search',
              components: {
                router_main: () => import('@/views/content/search.vue'),
              },
            },
            {
              path: 'content/notification',
              components: {
                router_main: () => import('@/views/content/notification.vue'),
              },
            },
            // 系统设置相关路由
            {
              path: 'system/roles',
              components: {
                router_main: () => import('@/views/system/roles.vue'),
              },
            },
            {
              path: 'system/faq',
              components: {
                router_main: () => import('@/views/system/faq.vue'),
              },
            },
            {
              path: 'system/about',
              components: {
                router_main: () => import('@/views/system/about.vue'),
              },
            },
            {
              path: 'system/city',
              components: {
                router_main: () => import('@/views/system/city.vue'),
              },
            },
            {
              path: 'system/logs',
              components: {
                router_main: () => import('@/views/system/logs.vue'),
              },
            },
            {
              path: 'system/password',
              components: {
                router_main: () => import('@/views/system/password.vue'),
              },
            },
            */
      ]
    },
]
export default router_table