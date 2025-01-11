import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { OrderForm } from "../../Schema/Validation"; // Assuming this schema is correct
import { useEffect } from "react";
import orderServise from "../../../services/order";
import { useSnackbar } from "notistack";

const initialValues = {
    qyt: '', 
    description: '', // Description
};

const UpdatedOrder = ({ id, info,closeEdit ,refreshTabel}) => {
    const { enqueueSnackbar } = useSnackbar();
    const getOrderUpdateInformation = async (id,value) => {
        try {
          const res = await orderServise.getUpdateOrderInformation(id,value);
          console.log(res);
          if (res && res.success) {
            enqueueSnackbar("Order Updated Sucessfully", {
              variant: "success",
              anchorOrigin: { horizontal: "right", vertical: "top" },
              autoHideDuration: 3000,
            });
            closeEdit()
            refreshTabel()
            console.log("created Product "+productInformation)
          }
        //    else {
        //     enqueueSnackbar(res.data, {
        //       variant: "error",
        //       anchorOrigin: { horizontal: "right", vertical: "top" },
        //       autoHideDuration: 800,
        //     });
        //   }
        } catch (error) {
            console.log(sgfdsdfg)
          enqueueSnackbar("Error", {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
            autoHideDuration: 800,
          });
        }
      };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: OrderForm, // Assuming the schema is correct
        onSubmit: async (value) => {
            const updateValue = {
                ...value,
                qyt: Number(value.qyt), 
            };
            console.log(updateValue);
            getOrderUpdateInformation(id,updateValue)
        },
    });

    // UseEffect to update the form values when `info` prop changes
    useEffect(() => {
        if (info) {
            console.log(info);
            setValues({
                qyt: info.qyt || '',
                description: info.description || '',
            });
        }
    }, [info, setValues]); // Ensure to watch `info` prop for changes

    return (
        <>
            <div className="w-auto p-5 mt-2 rounded-xl shadow-2xl" style={{ boxShadow: "0px 0px 8px #cccccc" }}>
                <div className="flex">
                    <div style={{ padding: "5px" }}>
                        <Typography sx={{ color: "#848484" }}>Product Id:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{info.id}</Typography>
                        <Typography sx={{ color: "#848484" }}>Product Name:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{info.name}</Typography>
                        <Typography sx={{ color: "#848484" }}>Supplier Name:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{info.supplier_name}</Typography>
                        <Typography sx={{ color: "#848484" }}>Size:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{info.size}</Typography>
                    </div>
                    <div style={{ border: "1px solid black" }}></div>
                    <div style={{ padding: "5px" }}>
                        <Typography sx={{ color: "#848484" }}>Rate:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>₹{info.rate}</Typography>
                        <Typography sx={{ color: "#848484" }}>Description:</Typography>
                        <Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{info.description}</Typography>
                        <div className="flex">
                            <Typography sx={{ color: "#848484" }}>Photo:</Typography>
                            <img src={info.photo} style={{ width: "100px", height: "100px" }} />
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
        </>
    );
};

export default UpdatedOrder;
