import React, { useState, useEffect } from 'react';
import { useCountdown } from 'react-countdown-circle-timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function Timer({ isPlaying, setIsPlaying, seconds, setSeconds}) {

  useEffect(() => {
    if (isPlaying && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, seconds]);

  // const resetTimer = () => {
  //   setSeconds(60);
  //   setIsPlaying(false);
  // }

  return (
    <>
    {/* <button className="bg-indigo-600 text-white p-3 rounded">
      Reset
    </button> */}
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={60}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
    </>
  );
}

export default Timer;