import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar,GridToolbarExport,GridToolbarContainer} from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import orderServise from "../../../services/order";
import { useSnackbar } from "notistack";


const AllOrder = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [orderInfo, setOrderInfo] = useState();
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const getAllTheOrderInformation = async () => {
    try {
      const res = await orderServise.getAllTheOrderInformation();

      //   setSuppluInformation(res.data);
      if (res && res.success) {
        setOrderInfo(res.data);
      } else {
        console.error(
          "Error fetching seller information",
          res.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Failed to fetch seller information:", error);
    }
  };
  useEffect(() => {
    getAllTheOrderInformation();
  }, []);
  const columns = [
    { field: "id", headerName: "Product ID", width: 180 },
    { field: "suppliername", headerName: "Supplier Name", width: 180 },
    { field: "productname", headerName: "Product Name", width: 180 },
    { field: "sellername", headerName: "Seller Name", width: 180 },
    { field: "size", headerName: "Size", width: 250 },
    { field: "rate", headerName: "Rate", width: 250 },
    {
      field: "photo",
      headerName: "Photo",
      width: 250,
      valueFormatter: (params) => {
        // For CSV export, just return the URL or any text you want to show.
        if (params) {
          return params; // Return the URL as is
        }
        return 'No image available'; 
      },
      renderCell: (params) => (
        <img
          src={params.value} // Assuming `params.value` contains the image URL
          alt="Product"
          style={{ width: "100px", height: "50px", borderRadius: "5px" }} // You can adjust the style
        />
      ),
    },
    { field: "orderdate", headerName: "Date", width: 250 },

    { field: "qyt", headerName: "Quantity", width: 250 },

    {
      field: "delete",
      headerName: "Delete",
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
            onClick={() => handleDeleteButton(params.row.order_id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const handleDeleteButton = (id) => {
    console.log("Action button clicked for:", id);
    getDeletedOrderInformation(id);
  };
  const getDeletedOrderInformation = async (id) => {
    try {
      const res = await orderServise.getDeletedOrderInformation(id);
      console.log(res);

      if (res) {
        enqueueSnackbar("Order Deleted Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheOrderInformation();
      } else {
        const errorMessage = res.message || res.data || "An unknown error occurred"; // Fallback message
  
        enqueueSnackbar(errorMessage, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        autoHideDuration: 800,
      });
    }
  };

  return (
    <>
      <div className="text-3xl font-bold">ALL ORDER</div>
      <Box sx={{ width: "90%", marginTop: "30px", borderRadius: "20px" }}>
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
          slots={{
            toolbar: CustomToolbar,
          }}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.order_id}
        />
      </Box>
    </>
  );
};

export default AllOrder;
