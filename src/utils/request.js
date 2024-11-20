/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 08:51:22
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 09:01:16
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/utils/request.js
 * @Description: request的编写
 * 2405499352@qq.com
 */
import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'   // 导入样式，否则看不到效果
NProgress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示

const request=axios.create({
    baseURL:'/dev-api',
    withCredentials:false,
    timeout:5000
})

request.defaults.headers['Content-Type']='application/json;charset=UTF-8'
request.interceptors.request.use(config=>{
    NProgress.start()
    return config
},error=>{
    console.log('请求异常======>',error)
    return Promise.reject(error)
})
equest.interceptors.response.use(response=>{
    NProgress.done();
    let {code,msg,data}=response.data
    console.log('响应code======>',code,',msg=====>',msg,',data=====>',data)
    if(code == null) {
        return response;
    }else if(code == 200) {
        return response;
    }else if(code == 500) {
        ElMessage.error(msg);
    }else if(code == 401) {
        ElMessage.error('没有操作权限！');
    }else if(code == 404) {
        ElMessage.error('未找到网页！');
    }else if(code == 403) {
        ElMessage.error('登录过期！');
    }else if(code==400){
        ElMessage.error('暂无数据或者访问方式有误')
    }else{
        // 需要重新登陆，跳转到登录页面，清除pinia中的数据，sessionStorage中
        window.sessionStorage.clear();
        window.localStorage.clear();
        router.push('/login');
    }
    return Promise.reject(msg);
},error=>{
    NProgress.done();   
    window.sessionStorage.clear();
    router.push('/login');
    return Promise.reject(error)
})



export default request