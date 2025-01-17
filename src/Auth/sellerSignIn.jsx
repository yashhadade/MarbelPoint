import React, { useState } from 'react';
import adminServiceInformation from '../../services/admin';
import { useSnackbar } from 'notistack'; // Assuming you're using this for notifications
import { useNavigate, useParams } from 'react-router-dom';
import sellerServise from '../../services/seller';
import UpdateSellerPassword from './UpdateSellerPassword';

const SellerSignIn = () => {
    const {id}=useParams();
  const [inputValue, setInputValue] = useState({ email: "", password: "" }); // Keep email and password in one state object
  const { enqueueSnackbar } = useSnackbar(); // Notification hook
  const navigate = useNavigate();

  
  const getSellerSignIn = async (email, password) => {
    try {
     
      const res = await sellerServise.getSellerSignIn({ email, password });
      
      if (res && res.success) {
        // Log the response for debugging
        console.log(res);

        const token = res.token;
        localStorage.setItem('token', token);

       if(id){
        navigate(`/placeOrder/${id}`);
       }else{
        navigate(`/sellerDasBhord`);
       }
        enqueueSnackbar('Sign-In Successful', {
          variant: 'success',
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
          autoHideDuration: 1000,
        });
      } else {
        const errorMessage = res.message || res.data || "An unknown error occurred"; // Fallback message
  
        enqueueSnackbar(errorMessage, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      enqueueSnackbar('Error during sign-in', {
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        autoHideDuration: 800,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In details:', { email: inputValue.email, password: inputValue.password });

    // Call the sign-in function with the values from the state
    getSellerSignIn(inputValue.email, inputValue.password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the email or password based on input name
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 p-5 rounded-xl shadow-xl">
        <div className="text-3xl font-bold text-center mb-4">SIGN IN</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <input
                type="email"
                name="email" // This matches the state key name
                placeholder="Email Address"
                value={inputValue.email} // Use the state value here
                onChange={handleInputChange} // Use the function to update the state
                className="border-2 rounded-md h-10 pl-2 text-lg"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <input
                type="password"
                name="password" // This matches the state key name
                placeholder="Password"
                value={inputValue.password} // Use the state value here
                onChange={handleInputChange} // Use the function to update the state
                className="border-2 rounded-md w-full h-10 pl-2 text-lg"
              />
            </div>

            <button className="border-2 mt-4 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white w-full" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default SellerSignIn;
