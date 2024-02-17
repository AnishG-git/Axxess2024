import React from 'react';
import {useNavigate} from 'react-router-dom';
import BackArrow from '../icons/backarrow';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/4 h-3/5 bg-white p-6 rounded shadow flex flex-col justify-evenly relative">
        <button onClick={() => navigate(-1)} className="absolute top-2 left-2 p-2 bg-gray-500 text-white rounded-md hover:bg-red-600"><BackArrow /></button>
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form className="mt-6">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input type="email" id="email" name="email" placeholder="Email" className="w-full p-4 border rounded-md outline-none hover:border-blue-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input type="password" id="password" name="password" placeholder="Password" className="w-full p-4 border rounded-md outline-none hover:border-blue-500" />
          </div>
          
        </form>

        <button className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enter</button>
      </div>
    </div>
  );
}

export default Login;