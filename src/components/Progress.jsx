import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Progress = ({ rating, size, thickness, textSize, percent }) => {
  const progress = (rating * 10).toFixed(0);
  const getColor = (progress) => {
    // if (progress == 0) {
    //   return "text-transparent";
    // } else if (progress > 0 && progress <= 20) {
    //   return "text-red-500";
    // } else if (progress > 20 && progress <= 55) {
    //   return "text-orange-500";
    // } else if (progress > 55 && progress <= 75) {
    //   return "text-green-500";
    // } else {
    //   return "text-cyan-500";
    // }
  };
  return (
    <>
      <div
        className={`Parogress  truncate isolate h-16 rounded-full p-1 text-white flex justify-center items-center relative bg-black/50 w-[65px] ${getColor(
          progress
        )}`}
        style={{
          "--value": progress,
          "--size": size,
          "--thickness": thickness,
        }}
      >
        <CircularProgressbar
          className={`text-[34px] font-bold fill-slate-950 h-14 ${textSize}`}
          value={rating}
          maxValue={10}
          styles={buildStyles({
            pathColor:
              progress < 55
                ? "red"
                : progress < 75
                ? "orange"
                : "rgb(74 222 128)",
            textColor: "white",
          })}
        />
        <div className="truncate isolate font-bold  md:text-xl absolute  ">
          {progress}
          <span className={`text-[8px] font-light text-white ${percent}`}>
            %
          </span>
        </div>
      </div>
    </>
  );
};

export default Progress;
