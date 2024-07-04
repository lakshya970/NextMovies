import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
