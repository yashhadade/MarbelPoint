import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In details:', { email, password });
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2  p-5 rounded-xl shadow-xl">
        <div className="text-3xl font-bold text-center mb-4">SIGN IN</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 rounded-md h-10 pl-2 text-lg"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default SignIn;
