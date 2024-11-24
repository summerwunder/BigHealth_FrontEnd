/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 21:23:57
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-24 09:26:31
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/content/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
// 获取轮播图列表
export const fetchBanners = (data) => {
    return request.get("/banner/list", {
     params:data 
    })
}

// 删除轮播图
export const deleteBannerById = (id) => request.delete(`/banner/${id}`);

// 新增轮播图
export const addBanner = (data) => request.post("/banner/add", data);