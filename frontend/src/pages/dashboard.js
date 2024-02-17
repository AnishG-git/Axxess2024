import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/navbar'

const sampleData = [
  { name: 'Jan', score: 4000, pred: null },
  { name: 'Feb', score: 3000, pred: null },
  { name: 'Mar', score: 2000, pred: null },
  { name: 'Apr', score: 2780, pred: null },
  { name: 'May', score: 1890, pred: null },
  { name: 'Jun', score: 2390, pred: null },
  { name: 'Jul', score: 4300, pred: 4300 },
  { name: 'Aug', score: 4300, pred: 4300 },
];

function Dashboard() {
  return (
    
    <div>
      <Navbar />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pred" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
