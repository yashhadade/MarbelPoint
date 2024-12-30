import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import orderServise from '../../../services/order';

const AllOrder = () => {
    const [orderInfo, setOrderInfo] = useState();
    const getAllTheOrderInformation = async () => {
        try {
            const res = await orderServise.getAllTheOrderInformation();

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
    useEffect(() => {
        getAllTheOrderInformation();

    }, []);
    const columns = [
        { field: 'id', headerName: 'Product ID', width: 180 },
        { field: 'supplier_id', headerName: 'Supplier Name', width: 180 },
        { field: 'name', headerName: 'Product Name', width: 180 },
        { field: 'size', headerName: 'Size', width: 250 },
        { field: 'rate', headerName: 'Rate', width: 250 },
        { field: 'photo', headerName: 'Photo', width: 250 },
        { field: 'orderdate', headerName: 'Date', width: 250 },

        { field: 'qyt', headerName: 'Quantity', width: 250 },

        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#ff4848",
                            ":hover": {
                                backgroundColor: "#ff1c1c",
                            },
                        }}
                        onClick={() => handleDeleteButton(params.row.product_id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
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
                        onClick={() => handleEditClick(params.row.product_id)}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ];
    const handleDeleteButton = (id) => {
        console.log('Action button clicked for:', id);
        getDeletedProductInformation(id);
    }
    const handleEditClick = (id) => {
        console.log()
        setOpenEdit(!openEdit);
        setProductId(id);
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
                    getRowId={(row) => row.product_id}
                />
            </Box>
        
        </>
    )
}

export default AllOrder