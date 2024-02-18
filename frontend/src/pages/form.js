import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    console.log(data);
    axios.post('http://127.0.0.1:8000/api/predict/', {
      MWT1: Number(data.MWT1),
      MWT2: Number(data.MWT2),
      FEV1: Number(data.FEV1),
      FVC:  Number(data.FVC),
      HAD:  Number(data.HAD),
      SGRQ: Number(data.SGRQ),
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };
  // console.log(errors);

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Input Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center space-y-4 mt-8">
          <label className="block">
            <span className="text-gray-700">MWT1</span>
            <input type="number" {...register('MWT1', {})} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">MWT2</span>
            <input type="number" {...register('MWT2', {})} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">FEV1</span>
            <input type="number" {...register('FEV1', {})} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">FVC</span>
            <input type="number" {...register('FVC', {})} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">HAD</span>
            <input type="number" {...register('HAD', { max: 10, min: 1 })} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">SGRQ</span>
            <input type="number" {...register('SGRQ', { max: 10, min: 1 })} className="p-2 text-lg rounded border border-gray-300 mt-1 block w-full" />
          </label>

          <input type="submit" className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600" />
        </form>
      </div>
    </div>
  );
}
export default Form;
