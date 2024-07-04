import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { themeContext } from "../context/themeContext";
import Footer from "../components/Footer";

const Layout = () => {
  const [theme, setTheme] = useState("dark");
  useContext(themeContext);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${theme} ${
          theme === "dark" ? "bg-black" : "bg-white"
        } h-[100vh]`}
      >
        <main className="min-h-screen bg-white dark:bg-gray-900 dark:text-white text-gray-900 font-inter">
          <NavBar />
          <Outlet />
          <Footer />
        </main>
      </div>
    </themeContext.Provider>
  );
};

export default Layout;
