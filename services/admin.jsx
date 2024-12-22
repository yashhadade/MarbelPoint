import { server } from "../Server/server"


const getAdminInformation=(data)=>{
    return server.post('/admin/signin',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const adminServiceInformation={
    getAdminInformation
}
export default adminServiceInformation;