import React, { useState, useEffect } from 'react';
import BackArrow from '../icons/backarrow';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Timer from '../components/timer';
import '../styles/form.css';
import Cookies from 'js-cookie';

function Form() {
  const [curr, setCurr] = useState(1);
  const [total, setTotal] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [key, setKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = 6;

  const onSubmit = data => {
    console.log(data);
    console.log("data.MWT1", data.MWT1);
    axios
      .post('http://127.0.0.1:8000/api/predict/', {
        MWT1: Number(data.MWT1),
        MWT2: Number(data.MWT2),
        FEV1: Number(data.FEV1),
        FVC: Number(data.FVC),
        HAD: Number(data.HAD),
        SGRQ: Number(data.SGRQ),
      },  {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Cookies.get('token')}`
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const nextCard = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      curr < total && setCurr(curr + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      curr > 1 && setCurr(curr - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between">
            <a href="/dashboard" className="hover:text-red-600">
              <BackArrow />
            </a>
            <p>
              {curr}/{total}
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-8 text-center">Daily Pulmo</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap items-center justify-center space-y-10 mt-8"
          >
            {currentCard === 0 && (
              <div className="">
                <Card
                  index={1}
                  total={totalCards}
                  name="MWT1"
                  label="Walk in place for 1 min and count how many steps you can take:"
                  register={register}
                />
              </div>
            )}
            {currentCard === 1 && (
              <Card
                index={2}
                total={totalCards}
                name="MWT2"
                label="Please repeat the same again for another minute:"
                register={register}
              />
            )}
            {currentCard === 2 && (
              <Card
                index={3}
                total={totalCards}
                name="FEV1"
                label="Breath out for as long as you can and time it. Then enter in seconds:"
                register={register}
              />
            )}
            {currentCard === 3 && (
              <Card
                index={4}
                total={totalCards}
                name="FVC"
                label="Please repeat the same one more time:"
                register={register}
              />
            )}
            {currentCard === 4 && (
              <Card
                index={5}
                total={totalCards}
                name="HAD"
                label="From 1-10 how anxious and depressive you have been feeling:"
                register={register}
              />
            )}
            {currentCard === 5 && (
              <Card
                index={6}
                total={totalCards}
                name="SGRQ"
                label="From 1-10 how has your quality of life has been:"
                register={register}
              />
            )}

            <div className="flex w-full items-center justify-between">
              <button
                type="button"
                onClick={prevCard}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Previous
              </button>
              {currentCard < totalCards - 1 ? (
                <button
                  type="button"
                  onClick={nextCard}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Next
                </button>
              ) : (
                <input
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
                />
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center">
          {/* <div className="absolute right-0 mr-64 bg-white p-6 rounded-full shadow-lg"> */}
          <button
            onClick={() => setKey(prevKey => prevKey + 1) && setIsPlaying(false)}
            className="bg-red-600 text-white p-3 rounded ml-10 mb-5"
          >
            Reset
          </button>
          <div
            className={`mb-4 ml-10 bg-white p-6 rounded-full shadow-lg ${
              isPlaying ? 'pulse' : ''
            }`}
          >
            <Timer key={key} isPlaying={isPlaying} setIsPlaying={setIsPlaying} seconds={seconds} setSeconds={setSeconds}/>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-10 bg-indigo-600 text-white p-3 rounded"
          >
            {isPlaying ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </>
  );
}

function Card({ index, total, name, label, register }) {
  return (
    <div>
      <div className=""></div>
      <label className="block ">
        <span className="text-gray-700 justify-center">{label}</span>
        {/* <span className="ml-72">
          {index}/{total}
        </span> */}
        <input
          type="number"
          {...register(name, {})}
          className="p-2 text-lg rounded border border-gray-300 mt-3 block w-full text-center"
        />
      </label>
    </div>
  );
}

// function Timer() {
//   const [seconds, setSeconds] = useState(60);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds(seconds => seconds - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const strokeDashoffset = (seconds / 60) * 283;

//   return (
//     <div className="flex justify-center items-center">
//       <svg className="w-16 h-16" viewBox="0 0 36 36">
//         <path
//           className="text-gray-300"
//           d="M18 2.0845
//             a 15.9155 15.9155 0 0 1 0 31.831
//             a 15.9155 15.9155 0 0 1 0 -31.831"
//           fill="none"
//           stroke="currentcolor"
//           strokeWidth="2"
//           strokeDasharray="100, 100"
//         />
//         <path
//           className="text-blue-500"
//           d="M18 2.0845
//             a 15.9155 15.9155 0 0 1 0 31.831
//             a 15.9155 15.9155 0 0 1 0 -31.831"
//           fill="none"
//           stroke="currentcolor"
//           strokeWidth="2"
//           strokeDasharray="100, 100"
//           strokeDashoffset={strokeDashoffset}
//         />
//       </svg>
//       <div className="absolute text-xs">{seconds} s</div>
//     </div>
//   );
// }

export default Form;
