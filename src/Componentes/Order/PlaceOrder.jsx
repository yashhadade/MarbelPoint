import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsServise from '../../../services/product';
import { OrderForm } from '../../Schema/Validation';
import { useFormik } from 'formik';
import orderServise from '../../../services/order';
import { useSnackbar } from 'notistack';

const initialValues = {
    qyt: '', // Start with an empty string
};

const PlaceOrder = () => {
    const [productInformation, setProductInformation] = useState(null); // Initialize state for product info
        const { enqueueSnackbar } = useSnackbar();

    const { id } = useParams(); 

    const getOrderInformation = async (value) => {
        try {
          const res = await orderServise.getOrderInformation(value);
          console.log(res);
          if (res && res.success) {
            enqueueSnackbar("Order Placed Sucessfully", {
              variant: "success",
              anchorOrigin: { horizontal: "right", vertical: "top" },
              autoHideDuration: 3000,
            });
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
    const getSingleProductInformation = async (productId) => {
        try {
            const res = await productsServise.getSingleProductInformation(productId);
            console.log(res);
            if (res && res.data) {
                setProductInformation(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch product information:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getSingleProductInformation(id);
        }
    }, [id]);

    // Formik setup for handling form data
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: OrderForm, // Assuming the schema is correct
        onSubmit: async (value) => {
            const updateValue = {
                ...value,
                product_id: productInformation.product_id, // Add the product_id from fetched product info
                qyt: Number(value.qyt), // Convert quantity to a number
            };
            getOrderInformation(updateValue);
            console.log(updateValue);
            // Here you can add functionality to send the order to the backend
        },
    });

    console.log(productInformation); // Logs the fetched product info

    return (
        <div className=' flex justify-center align-middle h-[100vh] pb-4'>
            <div className="h-[100vh] w-80 border p-4 mt-4 mb-4">
                <h1>Place Order</h1>
                {/* Render product information if available */}
                {productInformation ? (
                    <div>
                        
                        <h2 className=' text-lg' style={{fontWeight:"500"}}>Product Code: {productInformation.id}</h2>
                        <h2  className=' text-lg' style={{fontWeight:"500"}}>Supplier Name:{productInformation.supplier_name}</h2>
                        <h2 className=' text-lg' style={{fontWeight:"500"}}>Product Name: {productInformation.name}</h2>
                        <p>Photo:</p>
                        {/* Display product image if URL is available */}
                        {/* {productInformation.photo &&  */}
                        <img src={productInformation.photo} alt="Product Photo" className="w-32 h-32 object-cover" />
                        {/* } */}
                        <p>Description: {productInformation.description}</p>
                        <p className=' text-lg' style={{fontWeight:"500"}}>Price: ${productInformation.rate}</p>

                        {/* Order form */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                                <label htmlFor="qyt" className="text-left">
                                    Quantity
                                </label>
                                <input
                                    type="text"
                                    name="qyt"
                                    placeholder="Quantity"
                                    value={values.qyt}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                                />
                                {/* Show validation error if quantity is invalid */}
                                {errors.qyt && touched.qyt && <p className="text-left text-red-600">{errors.qyt}</p>}
                            </div>
                            <button
                                className="border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white"
                                type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    <p>Loading product information...</p>
                )}
            </div>
        </div>
    );
};

export default PlaceOrder;
