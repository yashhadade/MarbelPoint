import { useState, useEffect } from "react";
import productsServise from "../../../services/product";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { OrderForm } from "../../Schema/Validation";  // Assuming OrderForm schema is used for validation.
import orderServise from "../../../services/order";
import { useSnackbar } from "notistack";

const initialValues = {
    qyt: '', 
    description: '', // Description
};

function GetOrder() {
     const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");
    const [productInformation, setProductInformation] = useState(null); 

    // Handle form submission for productId input
    const handleProductIdSubmit = (event) => {
        event.preventDefault();
        const inputProductId = event.target.productId.value; 
        setProductId(inputProductId);
    };

    
    const getProductInformation = async (product_id) => {
        try {
            const res = await productsServise.getSingleProductInformation(product_id);
            if (res && res.data) {
                setProductInformation(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch product information:', error);
        }
    };

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
    const { values, errors, touched, handleBlur, handleChange, handleSubmit,resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: OrderForm,
        onSubmit: (value) => {
            const updateValue = {
                ...value,
                product_id: productInformation.product_id, 
                qyt: Number(value.qyt), 
            };
            getOrderInformation(updateValue);
            console.log(updateValue);  // Handle the form submission (e.g., API call to place an order)
            resetForm();
        },
    });

    // Fetch product information when productId changes
    useEffect(() => {
        if (productId) {
            getProductInformation(productId);
        }
    }, [productId]);

    return (
        <>
            <div>
                <div className="text-3xl font-bold">Placed Order</div>

                {/* Form to enter Product ID */}
                <div className="w-auto p-5 mt-2 rounded-xl shadow-2xl" style={{ boxShadow: "0px 0px 8px #cccccc" }}>
                    <form onSubmit={handleProductIdSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="productId" className="text-left">Product Id</label>
                            <input
                                type="text"
                                name="productId"
                                placeholder="Product ID"
                                className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                            />
                            <button
                                className="border-[0.5px] mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white"
                                type="submit"
                            >
                                Submit Product ID
                            </button>
                        </div>
                    </form>
                </div>

                {/* Conditional Rendering: Product Information */}
                {productInformation && (
                    <div className="w-auto p-5 mt-2 rounded-xl shadow-2xl" style={{ boxShadow: "0px 0px 8px #cccccc" }}>
                        <div className="flex">
                            <div style={{ padding: "5px" }}>
                                <Typography sx={{ color: "#848484" }}>Product Id:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.id}</Typography>
                                <Typography sx={{ color: "#848484" }}>Product Name:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.name}</Typography>
                                <Typography sx={{ color: "#848484" }}>Supplier Name:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.supplier_name}</Typography>
                                <Typography sx={{ color: "#848484" }}>Size:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.size}</Typography>
                            </div>
                            <div style={{ border: "1px solid black" }}></div>
                            <div style={{ padding: "5px" }}>
                                <Typography sx={{ color: "#848484" }}>Rate:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>₹{productInformation.rate}</Typography>
                                <Typography sx={{ color: "#848484" }}>Description:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.description}</Typography>
                                <div className="flex">
                                    <Typography sx={{ color: "#848484" }}>Photo:</Typography>
                                    <img src={productInformation.photo} style={{ width: "100px", height: "100px" }} />
                                </div>
                            </div>
                        </div>

                        {/* Order Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="qyt" className="text-left">Quantity</label>
                                <input
                                    type="text"
                                    name="qyt"
                                    value={values.qyt}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Quantity"
                                    className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                                />
                                {errors.qyt && touched.qyt && <p className="text-left text-red-600">{errors.qyt}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-left">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Description"
                                    className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                                />
                                {errors.description && touched.description && <p className="text-left text-red-600">{errors.description}</p>}
                            </div>

                            <button
                                className="border-[0.5px] mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white"
                                type="submit"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default GetOrder;
