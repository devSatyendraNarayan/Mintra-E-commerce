import React, { useEffect, useState } from "react";

const Countdown = ({ deadline, messageWhenExpired }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = deadline - now;

    if (difference <= 0) {
      return { expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (timeLeft.expired) {
        clearInterval(interval);
      }
      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col  gap-5 text-center auto-cols-max">
      {timeLeft.expired ? (
        <div className="flex flex-col">
          <p className="font-bold text-red-500 mb-2">Expired</p>
          <p>{messageWhenExpired}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <span className="countdown font-mono text-xl  text-red-500">
              <span style={{ "--value": timeLeft.days }}></span>
            </span>
            <p className="text-xs">days</p>
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-xl text-red-500">
              <span style={{ "--value": timeLeft.hours }}></span>
            </span>
            <p className="text-xs">hours</p>
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-xl text-red-500">
              <span style={{ "--value": timeLeft.minutes }}></span>
            </span>
            <p className="text-xs">min</p>
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-xl text-red-500">
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
            <p className="text-xs">sec</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
