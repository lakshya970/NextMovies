import React from "react";

const HeadingH1 = ({ children }) => {
  return (
    <h1 className="text-2xl font-semibold md:text-3xl capitalize">
      {children}
    </h1>
  );
};

export default HeadingH1;
