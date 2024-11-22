/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-22 10:57:53
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-22 18:25:05
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/order/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'
export const getOrders=(data)=>{
    return request.get('/order/list',{ 
        params: data
    }
)}
export const exportOrderList=(data)=>{
   
}


export const approveRefundRequest=(id)=>{
    return request.get('/orderDetail/approveRefund',{
        params: {id:id}
    })
}