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

export const addReservation=(data)=>{
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