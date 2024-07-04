import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/movie" },
    { name: "Tv shows", to: "/tv" },
  ];
  return (
    <div className="space-y-3 border-t border-slate-600 py-4 ">
      <div className="text-center md:flex justify-between items-center px-2 space-y-3 mx-4">
        <Link
          to="/"
          className="text-xl  uppercase font-extrabold text-green-400"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          next <span className="text-black dark:text-white">movies</span>
        </Link>
        <div className="space-x-4">
          {links.map(({ name, to }) => (
            <Link
              to={to}
              className=" text-[14px] md:text-[16px] font-bold uppercase "
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-400 text-sm">&copy;copyright @nextmovies</p>
      </div>
    </div>
  );
};

export default Footer;
