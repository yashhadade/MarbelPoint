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
export const  ProductForm=Yup.object({
    sname: Yup.string()
    .required('Supplier Name is required')
    .oneOf(['Supplier A', 'Supplier B', 'Supplier C'], 'Invalid Supplier'), // Validating the dropdown selection
  
  product: Yup.string()
    .required('Product Name is required'),
  
  size: Yup.string()
    .required('Size is required'),

  rate: Yup.number()
    .required('Rate is required')
    .typeError('Rate must be a number')
    .positive('Rate must be a positive number'),
  
  photo: Yup.string()
    .required('Photo is required')
    .matches(/^data:image\/(jpeg|png|jpg);base64,/, 'Invalid image format'), // Checks if it's a base64 image string

  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
})

export const SignUpForm = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  
    userName: Yup.string()
      .min(3, 'User Name must be at least 3 characters')
      .max(15, 'User Name must be less than 15 characters')
      .required('User Name is required'),
  
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });