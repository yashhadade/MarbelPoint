import { useFormik } from 'formik'
import React from 'react'
import { SupplierForm } from '../../Schema/Validation'
const initialValues={
    sname:"",
    phNumber:"",
    address:"",
}
const Supplier = () => {
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:SupplierForm,
        onSubmit:(value)=>{
            console.log("fileRegiste",value);
        }
    })
  return (
    <div>
        <div className=' text-3xl font-bold'>SUPPLIER</div>
        <div className=' border-2 w-auto p-5 mt-2 rounded-xl shadow-xl '>
        <form onSubmit={handleSubmit} >
            <div className=' flex flex-col'>
            <div className=' flex sm:flex-row'>
            <div className=' flex flex-col'>
                <label htmlFor="name"className=' text-left'>Supplier Name</label>
                <input type='text' autoComplete="off" name="sname" placeholder="Supplier Name" value={values.sname} onChange={handleChange}onBlur={handleBlur} className=' border-2 rounded-md h-10 pl-2 text-lg'/>
                {errors.sname && touched.sname?<p className=' text-left text-red-600'>{errors.sname}</p>:null}
            </div>
            <div className=' flex flex-col ml-2'>
                <label htmlFor="phnumber"className=' text-left'>Phone Number</label>
                <input type='text' autoComplete='off' name="phNumber" placeholder='Phone Number' value={values.phNumber} onChange={handleChange}onBlur={handleBlur} className='border-2 rounded-md w-52 h-10 pl-2 text-lg'/>
                {errors.phNumber&&touched.phNumber?<p className=' text-left  text-red-600'>{errors.phNumber}</p>:null}
            </div>
            </div>
            <div className=' flex flex-col mt-1'>
                <label htmlFor='address' className=' text-left'>Address</label>
                <textarea type='text' name="address" placeholder='Address' value={values.address} onChange={handleChange}onBlur={handleBlur} className='border-2 rounded-md pl-2 text-lg'/>
                {errors.address&&touched.address?<p className=' text-left  text-red-600'>{errors.address}</p>:null}
            </div>
            <button className=' border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white' type='submit'>Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Supplier