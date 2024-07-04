import React from "react";
import { Link } from "react-router-dom";
const imgURL = import.meta.env.VITE_IMAGE_UTL;

const Movies = ({ movies }) => {
  console.log(movies);
  return (
    <div className="">
      {movies.map((value) => (
        <Link key={value.id} className="grid grid-cols-2">
          <div>
            <img src={imgURL + value.poster_path} alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
