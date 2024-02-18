import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full z-0" style={{ top: 'auto', bottom: 0 }}>
          <path
            fill="#5a67d8"
            fillOpacity="1"
            d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,138.7C840,117,960,75,1080,53.3C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="flex flex-wrap w-full h-screen items-center justify-center z-0">
        <div className="bg-white z-10 p-10 rounded-2xl shadow-2xl">
          <svg width="400px" height="200px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="black">
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zM10 13H8a4 4 0 0 0 7.995.2L16 13h-2a2 2 0 0 1-3.995.15L10 13z" />
            </g>
          </svg>
          <div className="w-full text-center text-8xl font-bold text-black py-3">Pulmo</div>
          <div className="w-full text-center text-2xl  py-3 text-black">Predicting a happier, healthier life.</div>
          <div className="flex w-full items-center justify-center py-5">
            <button className="py-5 px-10 m-5 z-0 transition bg-indigo-600 text-white rounded-full font-bold hover:bg-violet-300 hover:text-black" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <div className="py-5 px-10 z-0 m-5 transition bg-indigo-600 text-white rounded-full font-bold hover:bg-violet-300 hover:text-black" onClick={() => navigate('/login')}>
              Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
