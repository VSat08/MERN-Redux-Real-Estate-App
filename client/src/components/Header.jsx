import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className=" ">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-2 px-6 bg-[rgba(255,255,255,.3)] backdrop-blur-sm rounded-full my-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-red-400">Real</span>
            <span>Estate App</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-1.5 px-3 rounded-3xl flex justify-between items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-48 md:w-64 "
          />
          <FiSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
