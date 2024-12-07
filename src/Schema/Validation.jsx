import * as Yup from "yup"

export const SupplierForm=Yup.object({
    sname:Yup.string()
                .min(4,"Supplier Name must be at least 4 charaters")
                .max(100, "Supplier name must be at most 100 characters")
                .required("Please Enter Your Supplier Name"),

    phNumber:Yup.string()
                .matches(/^[0-9]+$/, "Phone number must contain only numbers")
                .length(10, "Phone number must be exactly 10 digits")
                .required("Please Enter Phone Number"),

    address:Yup.string()
                .min(4)
                .max(255)
                .required("Please enter address")
})