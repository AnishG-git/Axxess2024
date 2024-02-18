import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/navbar';

const sampleData = [
  { name: 'Jan', score: 4000, pred: null },
  { name: 'Feb', score: 3000, pred: null },
  { name: 'Mar', score: 2000, pred: null },
  { name: 'Apr', score: 2780, pred: null },
  { name: 'May', score: 1890, pred: null },
  { name: 'Jun', score: 2390, pred: null },
  { name: 'Jul', score: 4300, pred: 4300 },
  { name: 'Aug', score: null, pred: 4300 },
];

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[-10]"></div>
      <div className="z-10">
        <div className="w-full flex flex-wrap pt-20">
          <div className="w-full lg:w-1/3 items-center justify-center">
            <h1 className="text-4xl font-bold mb-5 ml-10 w-full">Hello! Sample Name</h1>
            <h3 className="ml-10 mb-10 text-xl w-full">Let us see what your looking at!</h3>
          </div>
          <div className=" w-full lg:w-2/3 px-5 lg:pr-10">
            <div className=" outline-gray-200 outline rounded-xl  flex items-center justify-center ">
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="5 5" strokeWidth={3} />
                  <XAxis dataKey="name" strokeWidth={3} />
                  <YAxis strokeWidth={3} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pred" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} connectNulls />
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={3} connectNulls />
                </LineChart>
              </ResponsiveContainer>
              
              
            </div>
            <div className='w-full flex flex-wrap pt-5 '>
                <div className='w-1/3 '><div className='mx-2 flex  py-5 rounded-lg flex-wrap bg-indigo-600 items-center justify-center text-white  px-2'>Daily Log</div></div>
                <div className='w-1/3 '><div className='mx-2 flex  py-5 rounded-lg flex-wrap bg-blue-600 items-center justify-center text-white  px-2'>Hospital Call</div></div>
                <div className='w-1/3 '><div className='mx-2 flex  py-5 rounded-lg flex-wrap bg-fuchsia-600 items-center justify-center text-white  px-2'>Emergency Call</div></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
