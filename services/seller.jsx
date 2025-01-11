
import { server } from "../Server/server"


const getSellerInformation=(data)=>{
    return server.post('/seller/createSeller',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getAllTheSellerInformation=()=>{
    return server.get("seller/getAllSellers")
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getSingleSellerInformation=(id)=>{
    return server.get(`/seller/getSellerById/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getUpdateSellerInformation=(id,data)=>{
    return server.put(`/seller/update/${id}`,data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getDeletedSellerInformation=(id)=>{
    return server.delete(`/seller/delete/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}

const getSellerSignIn=(data)=>{
    return server.post('/seller/login',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}
const getUpdatePassword =(id,data)=>{
    return server.put(`/seller/update-password/${id}`,data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}
const sellerServise={
    getAllTheSellerInformation,
    getSingleSellerInformation,
    getUpdateSellerInformation,
    getDeletedSellerInformation,
    getSellerSignIn,
    getSellerInformation,
    getUpdatePassword
}

export default sellerServise;
