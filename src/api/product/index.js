/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-21 22:56:07
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-22 10:08:10
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/product/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
export const getProductList=(data)=>{
    return request.get('/product/list',{ 
        params: data
    }
)}

export const deleteProductById = (id) => {
    return request.delete(`/product/delete/${id}`);
};
export const createProduct = (data) => {
    return request.post(`/product/add`,data);
};

export const updateProduct = (data) => {
    return request.post(`/product/update`,data);
};
export const searchProductById = (id) => {
    return request.get(`/product/search/${id}`);
};