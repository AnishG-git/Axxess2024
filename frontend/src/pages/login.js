import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async e => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login/', {
        email: form.email,
        password: form.password,
      })
      .then(response => {
        console.log("RESPONSE", response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">

      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
        </label>
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded mt-1 hover:bg-blue-600">Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;