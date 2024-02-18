import React, { useState, useEffect } from 'react';
import BackArrow from '../icons/backarrow';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async e => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login/', {
        email: form.email,
        password: form.password,
      })
      .then(response => {
        console.log('RESPONSE', response.data);
        Cookies.set('token', response.data.token);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (Cookies.get('token')) {
    return null;
  } else {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full min-h-screen -z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full z-0"
            style={{ top: 'auto', bottom: 0 }}
          >
            <path
              fill="#5a67d8"
              fillOpacity="1"
              d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,138.7C840,117,960,75,1080,53.3C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
          
        </div>
        <div className="flex items-center justify-center min-h-screen ">
          <div className="p-8 bg-white rounded-xl shadow-md max-w-md w-full">
            <a
              href="/"
              className="flex items-center space-x-3 hover:text-red-600"
            >
              <BackArrow />
            </a>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <button
                type="submit"
                className="w-full p-2 text-white bg-blue-500 rounded mt-1 hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
