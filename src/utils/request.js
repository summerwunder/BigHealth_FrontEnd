/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 08:51:22
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 08:53:49
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/utils/request.js
 * @Description: 
 * 2405499352@qq.com
 */
import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'
import { setToken,getToken } from './token'
import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'   // 导入样式，否则看不到效果
NProgress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示

const request=axios.create({
    baseURL:'/dev-api',
    withCredentials:false,
    timeout:5000
})

request.defaults.headers['Content-Type']='application/json;charset=UTF-8'

export default request