import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUpForm } from '../Schema/Validation';
import sellerServise from '../../services/seller';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import PopUp from '../Model/popup';
import UpdateSellerPassword from './UpdateSellerPassword';

const initialValues = {
  email: '',
  name: '',
  password: '',
  address: '',
  phoneNumber:'',
};

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [sellerInformation,setSellerInformation]=useState()
  const [sellerId,setSellerId]=useState();
  const [openEdit,setOpenEdit]=useState(false);
  const [sellerEamilName,setsellerEamilName]=useState()
  const columns = [
    {field: 'email', headerName: 'Email', width: 180},
    { field: 'name', headerName: 'Seller Name', width: 180 },
    { field: 'address', headerName: 'Address', width: 180 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 250 },
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
            onClick={() => handleDeleteButton(params.row.seller_id)}
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
            onClick={() => handleEditClick(params.row.seller_id,params.row)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];
  const handleDeleteButton=(id)=>{
      console.log('Action button clicked for:', id);
        getDeletedSellerInformation(id);
  }
  const handleEditClick=(id,info)=>{
    setsellerEamilName(info)
    setSellerId(id)
    setOpenEdit(!openEdit);
  
  }
  const getDeletedSellerInformation= async (id)=>{
    try {
      const res= await  sellerServise.getDeletedSellerInformation(id);
      console.log(res);
      
      if(res){
        enqueueSnackbar("Supplier Deleted Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheSellerInformation();
      }else{
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
  }

  const getAllTheSellerInformation = async () => {
    try {
      const res = await sellerServise.getAllTheSellerInformation();
      
      if (res && res.success) {
        // console.log(res.data)
        setSellerInformation(res.data); // Set the updated data
        // console.log(sellerInformation)
      } else {
        console.error('Error fetching seller information', res.message || "Unknown error");
      }
    } catch (error) {
      console.error('Failed to fetch seller information:', error);
    }
  };

   useEffect(() => {
      getAllTheSellerInformation();
      
    }, []);

  const getSellerInformation = async (value) => {
    try {
      const res = await sellerServise.getSellerInformation(value);
      console.log(res);
      if (res && res.success) {
        enqueueSnackbar("Supplier Add Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
         getAllTheSellerInformation();
        console.log("created Product "+productInformation)
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpForm,
    onSubmit: async (value) => {
      const updatedValue = {
        ...value,
        phoneNumber: value.phoneNumber ? Number(value.phoneNumber) : '', // Convert to number safely if needed
      };

      console.log(updatedValue);
      getSellerInformation(updatedValue);
    },
  });

  return (
    <>
      <div className="text-3xl font-bold">SIGN UP</div>
      <div className="border-2 w-auto p-5 mt-2 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className=' flex sm:flex-row flex-col'>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md h-10 pl-2 text-lg"
                />
                {errors.email && touched.email && <p className="text-left text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:mt-0 mt-2">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="userName" className="text-left">
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="User Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.name && touched.name && <p className="text-left text-red-600">{errors.name}</p>}
              </div>
            </div>
            </div>

            <div className=' flex sm:flex-row flex-col'>
            <div className="flex flex-col sm:flex-row sm:mt-0 mt-2">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="password" className="text-left">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.password && touched.password && <p className="text-left text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:mt-0 mt-2 ml-3">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="address" className="text-left">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.address && touched.address && (
                  <p className="text-left text-red-600">{errors.address}</p>
                )}
              </div>
            </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-2">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
              <label htmlFor="phoneNumber" className="text-left">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-left text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            </div>


            <button className="border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white" type="submit">
                Submit
              </button>
          </div>
        </form>
      </div>
      <Box sx={{ width: '80%', marginTop: "30px", borderRadius: "20px" }}>
        <DataGrid
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 0px 8px #cccccc",
            padding: "10px",
          }}
          rows={sellerInformation}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.seller_id} 
        />
      </Box>
      <PopUp
        open={openEdit}
        title={"Update Passord"}
        handleClose={() => setOpenEdit(!openEdit)}
      >
        <UpdateSellerPassword
        selleInfo={sellerEamilName}
          id={sellerId}
          closeEdit={()=>setOpenEdit(!openEdit)}
        />
      </PopUp>
      </>
  );
};

export default SignUp;
