import React, { useState, useEffect } from 'react';
import { SupplierForm } from '../../Schema/Validation';
import { useFormik } from 'formik';
import supplierServise from '../../../services/supplier';

// Default form values
const initialValues = {
  name: '',
  phoneNumber: '',
  address: '',
};

const EditSupplier = ({ id,allInformation }) => {
  const [supplierInformation, setSupplierInformation] = useState(null);

  const getSingleSellerInformation = async (supplierId) => {
    try {
      const res = await supplierServise.getSingleSellerInformation(supplierId);
      console.log(res)
      setSupplierInformation(res.supplier); // Update supplier info
      // console.log(Number(res.supplier.phoneNumber));
    } catch (error) {
      console.error('Failed to fetch seller information:', error);
    }
  };
  console.log(res.supplier);
  useEffect(() => {
    if (id) {
      getSingleSellerInformation(id); // Fetch supplier info when ID changes
    }
  }, [id]);

  const getUpdateSupplierInformation = async (sellerId,value) => {
    try {
      const res = await supplierServise.getUpdateSupplierInformation(sellerId,value);
      console.log(res);
      if (res && res.success) {
        enqueueSnackbar("Supplier Edited Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 1000,
        });
        // allInformation();
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

  // Initialize the form with the supplier data once it's fetched
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
    initialValues, 
    validationSchema: SupplierForm,
    onSubmit: async (value) => {
      const updateValue = {
        ...value,
        phoneNumber: Number(value.phoneNumber),
        admin: 1,
      };
      getUpdateSupplierInformation(id,updateValue)
      console.log(updateValue);
    },
  });

 
  useEffect(() => {
    if (supplierInformation) {
      setValues({
        name: supplierInformation.name,
        phoneNumber:supplierInformation.phoneNumber || '',
        address: supplierInformation.address || '',
      });
    }
  }, [supplierInformation, setValues]); 

 
  if (!supplierInformation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-auto p-5 mt-2 rounded-xl shadow-2xl" style={{ boxShadow: '0px 0px 8px #cccccc' }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-left">Supplier Name</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="name"
                  placeholder="Supplier Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                />
                {errors.name && touched.name ? <p className="text-left text-red-600">{errors.name}</p> : null}
              </div>

              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="phoneNumber" className="text-left">Phone Number</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[0.5px] rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.phoneNumber && touched.phoneNumber ? <p className="text-left text-red-600">{errors.phoneNumber}</p> : null}
              </div>
            </div>

            <div className="flex flex-col mt-1">
              <label htmlFor="address" className="text-left">Address</label>
              <textarea
                type="text"
                name="address"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[0.5px] rounded-md pl-2 text-lg"
              />
              {errors.address && touched.address ? <p className="text-left text-red-600">{errors.address}</p> : null}
            </div>

            <button className="border-[0.5px] mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplier;
