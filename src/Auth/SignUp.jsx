import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUpForm } from '../Schema/Validation';

const initialValues = {
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpForm,  // Use the validation schema defined below
    onSubmit: (value) => {
      console.log('User signed up', value);
    },
  });

  return (
    <div>
      <div className="text-3xl font-bold">SIGN UP</div>
      <div className="border-2 w-auto p-5 mt-2 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md h-10 pl-2 text-lg"
                />
                {errors.email && touched.email && <p className="text-left text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-2">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="userName" className="text-left">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.userName && touched.userName && <p className="text-left text-red-600">{errors.userName}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-2">
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

            <div className="flex flex-col sm:flex-row mt-2">
              <div className="flex flex-col mt-2 sm:ml-2 sm:mt-0">
                <label htmlFor="confirmPassword" className="text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 rounded-md w-52 h-10 pl-2 text-lg"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-left text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button className="border-2 mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
