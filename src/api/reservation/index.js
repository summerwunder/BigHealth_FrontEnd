/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 09:29:27
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 19:34:30
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/api/reservation/index.js
 * @Description: 
 * 2405499352@qq.com
 */
import request from '@/utils/request'

export const fetchReservationList=(data)=>{
    return request.get('/record/list',{ 
        params: data
    }
)}

export const confirmArr = (id) => {
    return request.get('/record/arrival', {
         params: { id }, // 确保正确传递 ID 参数
    });
};

export const createRecord=(data)=>{
    return request.post('/record/add',data
)}

export const updateReservation=(data)=>{
    return request.post('/record/edit',data
)}

export const deleteReservation=(id)=>{
    return request.delete('/record/delete',{
        params:{id:id}
    })
}