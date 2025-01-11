import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import orderServise from '../../../services/order';
import PopUp from '../../Model/popup';
import UpdatedOrder from './UpdatedOrder';

const SellerOrder = () => {
    const [orderInfo, setOrderInfo] = useState();
    const [openEdit,setOpenEdit]=useState(false);
    const [orderId,setOrderId]=useState();
    const [orderDetail,setOrderDetail]=useState();
    const getAllTheOrderInformation = async () => {
        try {
            const res = await orderServise.getAllTheSellerOrderInformation();

            //   setSuppluInformation(res.data);
            if (res && res.success) {
                setOrderInfo(res.data);
            } else {
                console.error('Error fetching seller information', res.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Failed to fetch seller information:', error);
        }
    };
    console.log(orderInfo)
    useEffect(() => {
        getAllTheOrderInformation();

    }, []);
    const columns = [
        { field: 'id', headerName: 'Product ID', width: 180 },
        { field: 'suppliername', headerName: 'Supplier Name', width: 180 },
        { field: 'productname', headerName: 'Product Name', width: 180 },
        {field:"sellername", headerName: 'Seller Name', width: 180 },
        { field: 'size', headerName: 'Size', width: 250 },
        { field: 'rate', headerName: 'Rate', width: 250 },
        {
            field: "photo",
            headerName: "Photo",
            width: 250,
             hight:500,
            renderCell: (params) => (
              <img
                src={params.value} // Assuming `params.value` contains the image URL
                alt="Product"
                style={{ width: "100px", height: "50px", borderRadius: "5px" }} // You can adjust the style
              />
            ),
          },
        { field: 'orderdate', headerName: 'Date', width: 250 },

        { field: 'qyt', headerName: 'Quantity', width: 250 },
        {
            field: 'Edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#6b6565",
                            ":hover": {
                                backgroundColor: "#ac9c9c",
                            },
                        }}
                        onClick={() => handleEditClick(params.row.order_id,params.row)}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ];
   
    const handleEditClick = (id,info) => {
        console.log()
        setOpenEdit(!openEdit);
        setOrderId(id);
        setOrderDetail(info)
    }
    return (
        <>
            <div className="text-3xl font-bold">ALL ORDER</div>
            <Box sx={{ width: '90%', marginTop: "30px", borderRadius: "20px" }}>
                <DataGrid
                    sx={{
                        borderRadius: "20px",
                        boxShadow: "0px 0px 8px #cccccc",
                        padding: "10px",
                    }}
                    rows={orderInfo}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.order_id}
                />
            </Box>
            <PopUp
        open={openEdit}
        title={"Edit Supplier"}
        handleClose={() => setOpenEdit(!openEdit)}
      >
        <UpdatedOrder
        id={orderId}
        refreshTabel={()=>getAllTheOrderInformation()}
        closeEdit={()=>setOpenEdit(!openEdit)}
        info={orderDetail}
        />
      </PopUp>
        </>
    )
}

export default SellerOrder