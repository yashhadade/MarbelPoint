import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { SupplierForm } from '../../Schema/Validation';
import supplierServise from '../../../services/supplier';
import { useSnackbar, SnackbarProvider } from 'notistack';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material'; // Add this import
import PopUp from '../../Model/popup';
import { Edit } from '@mui/icons-material';
import EditSupplier from './EditSupplier';

const initialValues = {
  name: "",
  phoneNumber: "",
  address: "",
};

const Supplier = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [suppluInformation, setSuppluInformation] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [supplierId, setSupplierId] = useState();
  
  // Columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Supplier Name', width: 180 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 180 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div>
          {/* Add a button for each row to perform actions */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff4848",
              ":hover": {
                backgroundColor: "#ff1c1c"
              }
            }}
            onClick={() => handleActionClick(params.row.supplier_id)}
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
          {/* Add a button for each row to perform actions */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6b6565",
              ":hover": {
                backgroundColor: "#ac9c9c"
              }
            }}
            onClick={() => handleEditClick(params.row.supplier_id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  // Action button click handler
  const handleActionClick = (rowData) => {
    console.log('Action button clicked for:', rowData);
    getDeletedSupplierInformation(rowData);
  };

  const handleEditClick = (rowData) => {
    console.log('Action button clicked for:', rowData);
    setSupplierId(rowData);
    setOpenEdit(!openEdit);
  };

  // Fetch all supplier data
  const getAllTheSupplierInformation = async () => {
    try {
      const res = await supplierServise.getAllTheSupplierInformation();
      if (res && res.success) {
        const formattedData = res.data.map((item) => ({
          ...item,
          id: item.supplier_id, 
        }));
        setSuppluInformation(formattedData); 
      } else {
        console.error('Error fetching seller information', res.message || "Unknown error");
      }
    } catch (error) {
      console.error('Failed to fetch seller information:', error);
    }
  };

  useEffect(() => {
    getAllTheSupplierInformation(); 
  }, []);

  // Handle form submission using Formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SupplierForm,
    onSubmit: async (value) => {
      const updateValue = {
        ...value,
        phoneNumber: Number(value.phoneNumber), // Ensure the phone number is a number
      };
      await getSupplierInformation(updateValue);
    },
  });

  // API call to register/update supplier data
  const getSupplierInformation = async (value) => {
    try {
      const res = await supplierServise.getSupplierInformation(value);
      if (res && res.success) {
        enqueueSnackbar("Supplier Add Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheSupplierInformation(); // Refresh the supplier list after adding
      } else {
        enqueueSnackbar(res.data, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 800,
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

  const getDeletedSupplierInformation = async (id) => {
    try {
      const res = await supplierServise.getDeletedSupplierInformation(id);
      if (res) {
        enqueueSnackbar("Supplier Deleted Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheSupplierInformation();
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
    <SnackbarProvider maxSnack={3}>
      <div>
        <div className='text-3xl font-bold'>SUPPLIER</div>

        {/* Form to add or update supplier */}
        <div className='w-auto p-5 mt-2 rounded-xl shadow-2xl' style={{ boxShadow: "0px 0px 8px #cccccc" }}>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex flex-col'>
                  <label htmlFor="name" className='text-left'>Supplier Name</label>
                  <input
                    type='text'
                    autoComplete="off"
                    name="name"
                    placeholder="Supplier Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='border-[0.5px] rounded-md h-10 pl-2 text-lg'
                  />
                  {errors.name && touched.name ? <p className='text-left text-red-600'>{errors.name}</p> : null}
                </div>

                <div className='flex flex-col mt-2 sm:ml-2 sm:mt-0'>
                  <label htmlFor="phoneNumber" className='text-left'>Phone Number</label>
                  <input
                    type='text'
                    autoComplete='off'
                    name="phoneNumber"
                    placeholder='Phone Number'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='border-[0.5px] rounded-md w-52 h-10 pl-2 text-lg'
                  />
                  {errors.phoneNumber && touched.phoneNumber ? <p className='text-left text-red-600'>{errors.phoneNumber}</p> : null}
                </div>
              </div>

              <div className='flex flex-col mt-1'>
                <label htmlFor='address' className='text-left'>Address</label>
                <textarea
                  type='text'
                  name="address"
                  placeholder='Address'
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='border-[0.5px] rounded-md pl-2 text-lg'
                />
                {errors.address && touched.address ? <p className='text-left text-red-600'>{errors.address}</p> : null}
              </div>

              <button className='border-[0.5px] mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MUI DataGrid for displaying supplier information */}
      <Box sx={{ width: '80%', marginTop: "30px", borderRadius: "20px" }}>
        <DataGrid
          sx={{ borderRadius: "20px", boxShadow: "0px 0px 8px #cccccc", padding: "10px" }}
          rows={suppluInformation}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.supplier_id} // Ensure each row has a unique `id`
        />
      </Box>
      <PopUp open={openEdit} title={"Edit Supplier"} handleClose={() => setOpenEdit(!openEdit)}  >
      <EditSupplier id={supplierId} allSupplierInformation={getAllTheSupplierInformation} />
      </PopUp>
    </SnackbarProvider>
  );
};

export default Supplier;
