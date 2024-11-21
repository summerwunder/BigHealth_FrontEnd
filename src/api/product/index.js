import request from '@/utils/request'
export const getProductList=(data)=>{
    return request.get('/product/list',{ 
        params: data
    }
)}

export const deleteProductById = (id) => {
    return request.delete(`/product/delete/${id}`);
};