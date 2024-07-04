import React from "react";

const Heading = ({ text }) => {
  return (
    <h2 className="text-xl md:text-2xl font-semibold capitalize w-fit underline underline-offset-8 decoration-green-400">
      {text}
    </h2>
  );
};

export default Heading;
