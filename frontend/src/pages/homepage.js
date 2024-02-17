import React from 'react';

function Homepage() {
  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full h-screen z-[-10]>"></div>
      <div className="flex flex-wrap w-full h-screen z-0 items-center justify-center">
        <div>
          <div className="w-full text-center text-5xl font-bold text-black py-3">COPeePee</div>
          <div className="w-full text-center text-2xl  py-3 text-black">Predicting a happier, healthier life.</div>
          <div className="flex w-full items-center justify-center py-5">
            <button className="py-5 px-7 text-xl font-semibold bg-indigo-600 text-white mx-3 rounded-full hover:bg-violet-300 hover:text-black">Sign Up</button>
            <div className="py-5 px-7 text-xl font-semibold bg-indigo-600 text-white mx-3 rounded-full hover:bg-violet-300 hover:text-black">Log In</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
