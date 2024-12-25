import { server } from "../Server/server"


const getSupplierInformation=(data)=>{
    return server.post('/supplier/addsupplier',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getAllTheSupplierInformation=()=>{
    return server.get("/supplier/getAllSupplier")
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}

const getSingleSupplierInformation=(id)=>{
    return server.get(`/supplier/getSupplier/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getUpdateSupplierInformation=(id,data)=>{
    return server.put(`/supplier/updateSupplier/${id}`,data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}
const getDeletedSupplierInformation=(id)=>{
    return server.delete(`/supplier/deleteSupplier/${id}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response;
    })
}

const supplierServise={
    getSupplierInformation,
    getAllTheSupplierInformation,
    getSingleSupplierInformation,
    getUpdateSupplierInformation,
    getDeletedSupplierInformation
}

export default supplierServise;
