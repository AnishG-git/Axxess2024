import React from 'react';
import BackArrow from "../icons/backarrow"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Bear from '../images/bear.png';
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    console.log(data);
    axios
      .post('http://127.0.0.1:8000/api/predict/', {
        MWT1: Number(data.MWT1),
        MWT2: Number(data.MWT2),
        FEV1: Number(data.FEV1),
        FVC: Number(data.FVC),
        HAD: Number(data.HAD),
        SGRQ: Number(data.SGRQ),
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  // console.log(errors);

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
    <div className="flex items-center justify-center mt-8">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <a href="/dashboard" className="flex items-center space-x-3 hover:text-red-600">
          <BackArrow />
        </a>
        <h2 className="text-2xl font-bold mb-8 text-center">Input Form</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-4 mt-8"
        >
          <label className="block">
            <span className="text-gray-700">MWT1</span>
            <input
              type="number"
              {...register('MWT1', {})}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">MWT2</span>
            <input
              type="number"
              {...register('MWT2', {})}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">FEV1</span>
            <input
              type="number"
              {...register('FEV1', {})}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">FVC</span>
            <input
              type="number"
              {...register('FVC', {})}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">HAD</span>
            <input
              type="number"
              {...register('HAD', { max: 10, min: 1 })}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">SGRQ</span>
            <input
              type="number"
              {...register('SGRQ', { max: 10, min: 1 })}
              className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full"
            />
          </label>

          <input
            type="submit"
            className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          />
        </form>
      </div>
    </div>
    </div>
  );
}
export default Form;
