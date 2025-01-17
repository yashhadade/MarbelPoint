import * as Yup from "yup"

export const SupplierForm = Yup.object({
  name: Yup.string()
    .min(4, "Supplier Name must be at least 4 charaters")
    .max(100, "Supplier name must be at most 100 characters")
    .required("Please Enter Your Supplier Name"),

    phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(8, "Phone number must be at least 8 digits")
    .max(10, "Phone number must be at most 10 digits")
    .required("Please Enter Phone Number"),

  address: Yup.string()
    .min(4)
    .max(255)
    .required("Please enter address")
})
export const ProductForm = () => {
  return Yup.object({
    // sname: Yup.string()
    //   .required('Supplier Name is required')
    //   .oneOf(
    //     suppluInformation.map((supplier) => supplier.supplier_id), // Validate if the supplier name exists in the array
    //     'Invalid Supplier'
    //   ),
    supplier_id: Yup.string()
      .required('Product Name is required'),
    name: Yup.string()
      .required('Product Name is required'),

    size: Yup.string()
      .required('Size is required'),

    rate: Yup.number()
      .required('Rate is required')
      .typeError('Rate must be a number')
      .positive('Rate must be a positive number'),
    buyprice: Yup.number()
      .required('Buy Price is required')
      .typeError('Buy Price must be a number')
      .positive('Buy Price must be a positive number'),
    image: Yup.string()
      .required('Photo is required'), // Only checks that it's not empty

    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
  });
};

export const SignUpForm = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  name: Yup.string()
    .min(4, 'User Name must be at least 4 characters')
    .max(15, 'User Name must be less than 15 characters')
    .required('User Name is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .max(255, 'Address cannot exceed 255 characters')
    .required('Please enter an address'),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
    .length(10, 'Phone number must be exactly 10 digits')
    .required('Please enter a phone number'),
});

export const OrderForm = Yup.object({
  qyt: Yup.number()
    .required('Rate is required')
    .typeError('Rate must be a number')
    .positive('Rate must be a positive number'),
    description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
})

export const UpdatePassword = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});