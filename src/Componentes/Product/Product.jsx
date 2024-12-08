import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ProductForm } from '../../Schema/Validation';

const initialValues = {
  sname: '', 
  address: '',
  product: '',
  size: '',
  rate: '',
  photo: '', 
  description: '',
};

const Product = () => {
  const [imagePreview, setImagePreview] = useState(''); // Store the base64 image preview

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: ProductForm,
    onSubmit: (value) => {
      console.log('fileRegister', value);
    },
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange({
          target: {
            name: 'photo',
            value: reader.result, 
          },
        });
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
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
                  name="sname"
                  value={values.sname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md h-10 w-52 pl-2 text-lg"
                >
                  <option value="">Select Supplier</option>
                  <option value="Supplier A">Supplier A</option>
                  <option value="Supplier B">Supplier B</option>
                  <option value="Supplier C">Supplier C</option>
                </select>
                {errors.sname && touched.sname && <p className="text-left text-red-600">{errors.sname}</p>}
              </div>
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="product" className="text-left">
                  Product Name
                </label>
                <input
                  type="text"
                  name="product"
                  placeholder="Product Name"
                  value={values.product}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.product && touched.product && <p className="text-left text-red-600">{errors.product}</p>}
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
                <label htmlFor="photo" className="text-left">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileUpload}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.photo && touched.photo && <p className="text-left text-red-600">{errors.photo}</p>}
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
  );
};

export default Product;
