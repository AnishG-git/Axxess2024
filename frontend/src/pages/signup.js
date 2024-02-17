import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import BackArrow from '../icons/backarrow';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleInputChange = event => {
    let formattedInput = event.target.value.split('-').join('');
    if (formattedInput.length > 3 && formattedInput.length <= 6) formattedInput = formattedInput.slice(0, 3) + '-' + formattedInput.slice(3);
    else if (formattedInput.length > 6) formattedInput = formattedInput.slice(0, 3) + '-' + formattedInput.slice(3, 6) + '-' + formattedInput.slice(6);
    setPhoneNumber(formattedInput);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-3/5 bg-white p-6 rounded shadow flex flex-col justify-evenly">
          <button onClick={() => navigate(-1)} className="absolute top-2 left-2 p-2 bg-gray-500 text-white rounded-md hover:bg-red-600">
            <BackArrow />
          </button>
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <form className="mt-6 flex flex-wrap -mx-3">
              <div className="w-full mb-5 px-3">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                  Name
                </label>
                <input type="text" id="name" name="name" placeholder="Name" className="w-full p-4 border rounded-md outline-none hover:border-blue-500" />
              </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <div className="mb-5">
                <label htmlFor="packyear" className="block mb-2 text-sm font-medium text-gray-600">
                  Pack Year
                </label>
                <input type="number" id="packyear" name="packyear" placeholder="Pack Year" className="w-full p-4 border rounded-md outline-none hover:border-blue-500" />
              </div>
              <div className="mb-5">
                <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Phone Number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-md outline-none hover:border-blue-500"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="dateofbirth" className="block mb-2 text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <DatePicker onChange={setDateOfBirth} value={dateOfBirth} className="w-full p-4 border rounded-md outline-none hover:border-blue-500" />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <div className="mb-5">
                <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-600">
                  Sex
                </label>
                <select id="sex" name="sex" className="w-full p-4 border rounded-md outline-none hover:border-blue-500">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

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
            </div>
          </form>

          <button className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enter</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
