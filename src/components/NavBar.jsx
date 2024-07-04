import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { themeContext } from "../context/themeContext";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [burger, setBurger] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const links = [
    { name: "home", to: "/" },
    { name: "movies", to: "/movie" },
    { name: "tv shows", to: "/tv" },
  ];
  const { theme, setTheme } = useContext(themeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClick(click);
    if (!search) {
    } else {
      navigate(`/search/${search}`);
      setSearch("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="h-16 w-full px-4 py-2 border-b border-black/20 dark:border-white/20 flex items-center justify-between z-20 backdrop-blur sticky top-0 dark:bg-slate-900/90 bg-white/90">
      <Link
        to="/"
        className="text-xl  uppercase font-extrabold text-green-400"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        next <span className="text-black dark:text-white">movies</span>
      </Link>
      <div className="flex md:gap-2">
        <form
          className="hidden md:flex items-center w-[350px] 
         "
          onSubmit={handleSubmit}
        >
          <div className="flex  justify-between px-4 py-2  border-[1px] border-slate-200 rounded-full bg-white dark:bg-slate-900 dark:text-white w-[350px] dark:border-[1px] border-slate-600  ">
            <input
              value={search}
              type="text"
              placeholder="Search movies"
              className="w-full outline-none bg-transparent dark:placeholder:text-slate-400"
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch size={25} />
          </div>
        </form>
        {/* mobile form */}
        <form
          className="md:hidden flex items-center "
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <CiSearch
            size={25}
            onClick={() => setClick(!click)}
            className=" cursor-pointer font-bold"
          />

          {click ? (
            <div
              className="absolute h-screen w-full top-0 inset-x-0 px-4 py-16  bg-black/50 z-[55] "
              onClick={(e) => {
                e.stopPropagation();
                setClick(false);
              }}
            >
              <input
                value={search}
                type="text"
                autoFocus
                placeholder="Search movies"
                className="w-full outline-none rounded-full py-2 px-3 text-black"
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />

              <CiSearch size={25} className=" absolute text-black right-6" />
            </div>
          ) : null}
        </form>
        {/* Modes */}
        <div className="flex items-center cursor-pointer md:order-1 ml-3 hover:bg-slate-100 hover:dark:bg-slate-800 px-3 py-3 rounded-full ">
          {theme === "dark" ? (
            <FaRegMoon size={20} onClick={() => setTheme("light")} />
          ) : (
            <IoSunny size={23} onClick={() => setTheme("dark")} />
          )}
        </div>
        {/* links */}
        <div className="hidden md:flex items-center gap-8 mx-4  dark:text-slate-200">
          {links.map((item, index) => (
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex uppercase   text-[16px] font-bold text-[15px] ${
                  isActive
                    ? "text-green-400"
                    : "text-slate-800 dark:text-slate-200"
                }`
              }
            >
              <a key={index}>{item.name}</a>
            </NavLink>
          ))}
        </div>
        {/* mobile links */}
        <div
          className="md:hidden
        flex items-center cursor-pointer"
        >
          <BiDotsVerticalRounded
            size={43}
            onClick={() => setBurger(!burger)}
            className="hover:bg-slate-800 rounded-full p-2 "
          />
          <div
            className={`bg-slate-200 absolute top-[65px] right-5 px-6 py-4 space-y-2 rounded-lg z-20 duration-300 origin-top-right text-black dark:text-slate-300 dark:bg-slate-900/90  ${
              burger ? " scale-100 " : "scale-0 "
            }`}
          >
            {links.map((item, index) => (
              <Link
                to={item.to}
                className="flex capitalize text-[18px]"
                onClick={() => setBurger(false)}
              >
                <a key={index}>{item.name}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
