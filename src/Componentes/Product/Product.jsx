import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { ProductForm } from '../../Schema/Validation';
import supplierServise from '../../../services/supplier';
import productsServise from '../../../services/product';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PopUp from '../../Model/popup';
import EditProduct from './EditProduct';


const initialValues = {
  supplier_id: '',
  name: '',
  size: '',
  rate: '',
  image: '',
  description: '',
};

const Product = () => {
    const { enqueueSnackbar } = useSnackbar();

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [suppluInformation, setSuppluInformation] = useState([]);
  const [productInformation, setProductInformation] = useState();
  const [openEdit,setOpenEdit]=useState(false)
  const [productId,setProductId]=useState();
  const columns = [
    { field: 'supplier_id', headerName: 'Supplier Name', width: 180 },
    { field: 'name', headerName: 'Product Name', width: 180 },
    { field: 'size', headerName: 'Size', width: 250 },
    { field: 'rate', headerName: 'Rate', width: 250 },
    { field: 'photo', headerName: 'Photo', width: 250 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'qr_code',
      headerName: 'Qr Code',
      width: 250,
      renderCell: (params) => (
        <div>
          {/* Create a button that will download the QR code */}
          <a
            href={params.row.qr_code}
            download
            style={{ textDecoration: 'none' }}  // Make sure the link doesn't have underline
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4caf50", // Green color for the download button
                ":hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              Download QR
            </Button>
          </a>
        </div>
      ),
    },
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
  const handleDeleteButton=(id)=>{
      console.log('Action button clicked for:', id);
       getDeletedProductInformation(id);
  }
  const handleEditClick=(id)=>{
    console.log()
    setOpenEdit(!openEdit);
    setProductId(id);
  }
  const getDeletedProductInformation= async (id)=>{
    try {
      const res= await  productsServise.getDeletedProductInformation(id);
      console.log(res);
      
      if(res){
        enqueueSnackbar("Supplier Deleted Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheProductInformation();
      }else{
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
  }
  const getProductInformation = async (value) => {
    try {
      const res = await productsServise.getProductInformation(value);
      console.log(res);
      if (res && res.success) {
        enqueueSnackbar("Supplier Add Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        getAllTheProductInformation();
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
    validationSchema: ProductForm,
    onSubmit: async (value) => {
      const updateValue = {
        ...value,
        supplier_id: Number(value.supplier_id),
        rate: Number(value.rate),
        size: Number(value.size),
      };

      console.log(updateValue);
      getProductInformation(updateValue);
      
    },


  });
  const getAllTheProductInformation = async () => {
    try {
      const res = await productsServise.getAllTheProductInformation();
      // const formattedData = res.data.map((item) => ({
      //   ...item,
      //   id: item.product_id, // Use supplier_id as the id field for DataGrid
      // }));(
      setProductInformation(res.data);
      if (res && res.success) {
        setProductInformation(res.data); // Set the updated data
      } else {
        console.error('Error fetching seller information', res.message || "Unknown error");
      }
    } catch (error) {
      console.error('Failed to fetch seller information:', error);
    }
  };



  const getAllTheSellerInformation = async () => {
    try {
      const res = await supplierServise.getAllTheSellerInformation();
      
      setSuppluInformation(res.data);
      if (res && res.success) {
        setSuppluInformation(res.data);
      } else {
        console.error('Error fetching seller information', res.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to fetch seller information:', error);
    }
  };

  
  useEffect(() => {
    getAllTheSellerInformation();
    getAllTheProductInformation();
  }, []);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      handleChange({
        target: {
          name: 'image',
          value: file.name,
        },
      });
    }
  };
  

  return (
    <>
      <div>
        <div className="text-3xl font-bold">PRODUCT</div>
        <div className="border-2 w-auto p-5 mt-2 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="sname" className="text-left">
                    Supplier Name
                  </label>
                  <select
                    name="supplier_id"
                    value={values.supplier_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-2 rounded-md h-10 w-52 pl-2 text-lg"
                  >
                    <option value="">Select Supplier</option>
                    {suppluInformation.length > 0 ? (
                      suppluInformation.map((info, index) => (
                        <option key={index} value={info.supplier_id}>
                          {info.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No suppliers available</option>
                    )}
                  </select>
                  {errors.supplier_id && touched.supplier_id && <p className="text-left text-red-600">{errors.supplier_id}</p>}
                </div>
                <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                  <label htmlFor="product" className="text-left">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                  />
                  {errors.name && touched.name && <p className="text-left text-red-600">{errors.name}</p>}
                </div>
                <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                  <label htmlFor="size" className="text-left">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={values.size}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                  />
                  {errors.size && touched.size && <p className="text-left text-red-600">{errors.size}</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row mt-2">
                <div className="flex flex-col mt-2 ml-2 sm:ml-0 sm:mt-0">
                  <label htmlFor="rate" className="text-left">
                    Rate
                  </label>
                  <input
                    type="text"
                    name="rate"
                    placeholder="Rate"
                    value={values.rate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                  />
                  {errors.rate && touched.rate && <p className="text-left text-red-600">{errors.rate}</p>}
                </div>
                <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                  <label htmlFor="image" className="text-left">
                    Photo
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileUpload}
                    onBlur={handleBlur}
                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                  />
                  {errors.image && touched.image && <p className="text-left text-red-600">{errors.image}</p>}
                </div>
                <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                  <label htmlFor="description" className="text-left">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                  />
                  {errors.description && touched.description && (
                    <p className="text-left text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover" />
                </div>
              )}

              <button className="border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Box sx={{ width: '80%', marginTop: "30px", borderRadius: "20px" }}>
        <DataGrid
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 0px 8px #cccccc",
            padding: "10px",
          }}
          rows={productInformation}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.product_id} 
        />
      </Box>
      <PopUp open={openEdit} title={"Edit Supplier"} handleClose={()=>setOpenEdit(!openEdit)} children={<EditProduct id={productId} allInformation={getAllTheProductInformation()} />}/>
      {/* <PopUp open={openEdit} title={"Edit Supplier"} handleClose={()=>setOpenEdit(!openEdit)} children={<div>hii</div>}/> */}
    </>

  );
};

export default Product;
