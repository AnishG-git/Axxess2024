import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full z-0" style={{ top: 'auto', bottom: 0 }}>
          <path
            fill="#5a67d8"
            fillOpacity="1"
            d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,138.7C840,117,960,75,1080,53.3C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="z-10">
        <div className="w-full flex flex-wrap pt-20">
          <div className="w-full lg:w-1/3 items-center justify-center px-5 lg:pl-10 mb-5 h-full">
            <div className='bg-white outline-gray-300 outline rounded-xl px-5 py-2 shadow-2xl'>
            <h1 className="text-4xl font-bold mb-5  w-full">Hello! Sample Name</h1>
            <h3 className="mb-10 text-xl w-full">Using out bear-ific AI model, we are able to calculate your CPOD levels and provide you the next plans of action. Lets take a look at your scores!</h3>
            </div>
            
          </div>
          <div className=" w-full lg:w-2/3 px-5 lg:pr-10">
            <div className=" outline-gray-300 outline rounded-xl  bg-white flex items-center justify-center shadow-2xl">
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="5 5" strokeWidth={1} />
                  <XAxis dataKey="name" strokeWidth={3} />
                  <YAxis strokeWidth={3} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pred" stroke="#8884d8" strokeDasharray="5 5" strokeWidth={3} activeDot={{ r: 8 }} connectNulls />
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={3} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full flex flex-wrap mt-7 py-2 bg-white outline outline-gray-300 rounded-xl shadow-2xl">
              <button className='w-1/3 ' onClick={() => {navigate("/form")}}>
              <div className="ml-4 mr-2 flex  py-6 rounded-lg flex-wrap bg-indigo-600 items-center justify-center text-white  px-2">Daily Log</div>
              </button>
              <div className="w-1/3 ">
              <div className="mx-2 flex  py-6 rounded-lg flex-wrap bg-blue-600 items-center justify-center text-white  px-2">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3_2)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V9H19C19.5304 9 20.0391 9.21071 20.4142 9.58579C20.7893 9.96086 21 10.4696 21 11V13C21 13.5304 20.7893 14.0391 20.4142 14.4142C20.0391 14.7893 19.5304 15 19 15H15V19C15 19.5304 14.7893 20.0391 14.4142 20.4142C14.0391 20.7893 13.5304 21 13 21H11C10.4696 21 9.96086 20.7893 9.58579 20.4142C9.21071 20.0391 9 19.5304 9 19V15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H9V5Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_2">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className='ml-2'>Hospital Call</p>
                </div>
              </div>
              <div className="w-1/3 ">
              <div className="mr-4 ml-2 flex  py-6 rounded-lg flex-wrap bg-fuchsia-600 items-center justify-center text-white  px-2">
                    <svg width="26" height="26" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24.581 19.544C24.581 22.913 21.792 22.913 20.289 22.913H18.415V16.544H20.77C22.087 16.544 24.581 16.544 24.581 19.544ZM38.977 16.181C39.255 12.753 40.248 9.607 42 6.723L35.281 0C33.158 1.828 30.742 2.84 28.002 3.019C25.5368 3.25594 23.0567 2.75693 20.875 1.585C18.574 2.731 16.204 3.21 13.733 3.019C11.177 2.79 8.871 1.884 6.805 0.278L0.0670006 6.998C1.724 9.923 2.647 12.985 2.829 16.181C2.915 17.653 2.495 19.679 1.553 22.298C1.06 23.75 0.687001 25.01 0.433001 26.062C0.198001 27.107 0.0510005 27.957 0.00200051 28.593C-0.0329995 31.384 0.750001 33.904 2.355 36.143C3.609 37.778 5.677 39.583 8.549 41.558C11.691 43.158 14.123 44.197 15.826 44.639L17.238 45.295C17.682 45.509 18.158 45.716 18.655 45.942C19.726 46.584 20.479 47.281 20.875 47.999C21.361 47.222 22.13 46.543 23.152 45.942C23.7656 45.6791 24.3734 45.4031 24.975 45.114C25.465 44.899 25.83 44.737 26.042 44.638C26.5057 44.4136 26.9784 44.2084 27.459 44.023C28.042 43.794 28.761 43.513 29.62 43.203C31.28 42.614 32.488 42.059 33.256 41.557C36.041 39.582 38.077 37.807 39.373 36.218C41.035 33.969 41.842 31.438 41.805 28.592C41.707 27.318 41.168 25.279 40.189 22.501C39.255 19.797 38.841 17.697 38.977 16.181ZM26.627 25.391C25.032 26.435 22.839 26.435 21.694 26.435H18.549V35.041H13.82V12.965H20.533C23.653 12.965 26.262 13.166 28.074 15.375C29.205 16.781 29.396 18.378 29.396 19.513C29.394 22.084 28.335 24.254 26.627 25.391Z"
                      fill="white"
                    />
                  </svg>
                  <p className='ml-2'>Emergency Call</p>
                {/* </div> */}
                <div className='w-1/3 '><div className='mx-2 flex  py-5 rounded-lg flex-wrap bg-gray-600 items-center justify-center text-gray  px-2'>Emergency Call</div></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
