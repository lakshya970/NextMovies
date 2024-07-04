import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 dark:bg-slate-900">
      {Array(20)
        .fill()
        .map((value, i) => (
          <div key={i}>
            <div className="hidden dark:block">
              <Skeleton
                baseColor="#1e293b"
                highlightColor="#475569"
                className="h-auto w-full rounded-xl aspect-[4/6]"
              />
            </div>
            <div className="dark:hidden block">
              <Skeleton
                baseColor="#E2E8F0"
                highlightColor="#F1F5F9"
                className="h-auto w-full rounded-xl aspect-[4/6]"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Loader;
