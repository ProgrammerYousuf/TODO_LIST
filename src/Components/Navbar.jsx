import React, { useState } from "react";
import "../App.css";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  let nav = "hidden";
  const [show, setshow] = useState(true);

  function showNavbar() {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
  }
  if (show === false) {
    nav = "flex";
  } else {
    nav = "hidden";
  }
  return (
    <nav className="flex justify-between bg-slate-700 text-white h-[60px] items-center">
      <div className="logo">
        <h1 className="font-bold text-xl mx-8">iTodo-list</h1>
      </div>
      <div className="icon">
        <CiMenuBurger
          className="font-black text-xl mx-9 text-white md:hidden block"
          onClick={showNavbar}
        />
      </div>
      <ul
        className={`md:static md:top-0 md:right-0 md:left-0  md:text-center md:gap-8 md:mx-9 md:flex md:flex-row ${nav} capitalize absolute flex-col left-0 right-0 top-[50px] bg-slate-700 text-center justify-center `}
      >
        <li className="cursor-pointer hover:font-bold hover:border-sky-100 hover:border-b-2  md:p-0 p-4">
          home
        </li>
        <li className="cursor-pointer hover:font-bold hover:border-sky-100 hover:border-b-2  md:p-0 p-4">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
