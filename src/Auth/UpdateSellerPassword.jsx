import { useFormik } from "formik";
import { UpdatePassword } from '../Schema/Validation';
import sellerServise from "../../services/seller";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
const initialValues={
    password: '',
}
const UpdateSellerPassword = ({ id, closeEdit,selleInfo }) => {
    const { enqueueSnackbar } = useSnackbar();
    const getUpdatePassword = async (id,value) => {
        try {
          const res = await sellerServise.getUpdatePassword(id,value);
          console.log(res);
          if (res && res.success) {
            enqueueSnackbar("Password Updated", {
              variant: "success",
              anchorOrigin: { horizontal: "right", vertical: "top" },
              autoHideDuration: 1000,
            });
            closeEdit()
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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: UpdatePassword,
        onSubmit: async (value) => {
          const updatedValue = {
            ...value,
          };
          getUpdatePassword(id,updatedValue)
          console.log(updatedValue);

        },
      });
    return (<>
        <div className="border-2 w-auto p-5 mt-2 rounded-xl shadow-xl">
            <div>
                <div className=" flex"><Typography className=" text-slate-600">Name:</Typography><Typography sx={{fontWeight:"600"}}>{selleInfo.name}</Typography></div>
                <div className=" flex"><Typography className=" text-slate-600">Email:</Typography><Typography sx={{fontWeight:"600"}}>{selleInfo.email}</Typography></div>
            </div>
            <form onSubmit={handleSubmit}>
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
                <button className="border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white" type="submit">
                Submit
              </button>
            </form>
        </div>
    </>)
}

export default UpdateSellerPassword;