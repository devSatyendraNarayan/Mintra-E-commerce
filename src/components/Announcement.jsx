import React from "react";
import Countdown from "./Countdown";

const Announcement = ({ message, deadline, messageWhenExpired }) => {
  return (
    <div className="bg-white flex items-center justify-center gap-10 flex-shrink-0 border-b-2 px-4 py-3 text-gray-800 mt-16">
      <p className="text-center text-xl text-gray-400 font-thin mb-4">{message}</p>
      <Countdown deadline={deadline} messageWhenExpired={messageWhenExpired} />
    </div>
  );
};

export default Announcement;
