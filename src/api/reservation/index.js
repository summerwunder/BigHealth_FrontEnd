import request from '@/utils/request'

export const fetchReservationList=(data)=>{
    return request.get('/record/list',{ 
        params: data
    }
)}

export const confirmArrival=(id)=>{
    return request.get('/record/arrival',{ 
        params: id
    }
)}