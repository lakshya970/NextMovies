import React from "react";
import { RiEmotionSadLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center gap-3">
      <div className="flex items-center font-bold text-3xl md:text-4xl">
        NotFound
      </div>
      <RiEmotionSadLine size={30} />
    </div>
  );
};

export default NotFound;
