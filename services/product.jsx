import { server } from "../Server/server"


const getProductInformation=(data)=>{
    return server.post('/products/addProduct',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getAllTheProductInformation=()=>{
    return server.get("/products/getAllProduct")
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getSingleProductInformation=(id)=>{
    return server.get(`/products/getProduct/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getUpdateProductInformation=(id,data)=>{
    return server.put(`/products/updateProduct/${id}`,data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getDeletedProductInformation=(id)=>{
    return server.delete(`/products/deleteProduct/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}

const productsServise={
    getProductInformation,
    getAllTheProductInformation,
    getSingleProductInformation,
    getUpdateProductInformation,
    getDeletedProductInformation
}

export default productsServise;
