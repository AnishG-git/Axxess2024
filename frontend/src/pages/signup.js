import React, { useState, useEffect } from 'react';
import BackArrow from '../icons/backarrow';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Cookies from 'js-cookie';
import Bear from '../images/bear.png';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    dob: '',
    pack_history: 0,
    sex: '',
    diabetes: 0,
    muscular: 0,
    hypertension: 0,
    atrial_fib: 0,
    ihd: 0,
  });

  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = e => {
    if (e.target.name === 'dob') {
      const date = new Date(e.target.value);
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      console.log(formattedDate);
      setFormData({ ...formData, [e.target.name]: formattedDate });
    } else if (
      ['diabetes', 'muscular', 'hypertension', 'atrialfib', 'ihd'].includes(
        e.target.name
      )
    ) {
      let value = e.target.value === 'yes' ? 1 : 0;
      setFormData({ ...formData, [e.target.name]: value });
    } else if (e.target.name === 'pack_history') {
      let num = parseInt(e.target.value, 10);
      setFormData({ ...formData, [e.target.name]: num });
    } else if (e.target.name === 'phone_number') {
      let num = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, [e.target.name]: num });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    console.log(e.target.name, e.target.value);
    console.log(formData);
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/register/', {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        dob: formData.dob,
        pack_history: formData.pack_history,
        sex: formData.sex,
        diabetes: formData.diabetes,
        muscular: formData.muscular,
        hypertension: formData.hypertension,
        atrial_fib: formData.atrialfib,
        ihd: formData.ihd,
      })
      .then(response => {
        console.log(response.data);
        Cookies.set('token', response.data.token);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (Cookies.get('token')) {
    return null;
  } else {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full min-h-screen -z-20">
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

        <div className="fixed bottom-10 right-20 lg:block hidden -z-10">
          <img
            src={Bear}
            alt="My Image"
            style={{ transform: 'scaleX(1)', width: '500px', height: 'auto' }}
          />
        </div>
        <div className="flex items-center justify-center min-h-screen z-0">
          <div className="p-8 my-5 bg-white rounded-xl shadow-md max-w-md w-full">
            <a
              href="/"
              className="flex items-center space-x-3 hover:text-red-600"
            >
              <BackArrow />
            </a>
            <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                Email
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Password
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                First Name
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Last Name
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Phone Number
                <InputMask
                  name="phone_number"
                  mask="(999) 999-9999"
                  maskChar={null}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Date of Birth
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Pack History
                <input
                  type="number"
                  name="pack_history"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <label className="block">
                Sex
                <select
                  name="sex"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="other">Other</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label className="block">
                Diabetes
                <select
                  name="diabetes"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="block">
                Muscular
                <select
                  name="muscular"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="block">
                Hypertension
                <select
                  name="hypertension"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="block">
                Atrial Fibrillation
                <select
                  name="atrialfib"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="block">
                IHD
                <select
                  name="ihd"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
