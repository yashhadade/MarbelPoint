import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react'
import { ProductForm } from '../../Schema/Validation';
import supplierServise from '../../../services/supplier';

const initialValues = {
    supplier_id: '',
    name: '',
    size: '',
    rate: '',
    image: '',
    description: '',
  };
const EditProduct = (id,allInformation) => {
     const [suppluInformation, setSuppluInformation] = useState([]);
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
        
         
       },
   
   
     });
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
        }, []);
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
  )
}

export default EditProduct