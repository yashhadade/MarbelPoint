import { server } from "../Server/server"


const getOrderInformation=(data)=>{
    return server.post('/order/placeOrder',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getAllTheOrderInformation=()=>{
    return server.get("/order/")
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getSingleOrderInformation=(id)=>{
    return server.get(`/order/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getUpdateOrderInformation=(id,data)=>{
    return server.put(`/order/update${id}`,data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getDeletedOrderInformation=(id)=>{
    return server.delete(`/order/delete/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}

const orderServise={
    getOrderInformation,
    getAllTheOrderInformation,
    getSingleOrderInformation,
    getUpdateOrderInformation,
    getDeletedOrderInformation
}

export default orderServise;
