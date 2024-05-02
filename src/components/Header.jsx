import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-red-400">Real</span>
            <span>Estate App</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex justify-between items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FiSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>
          <Link to="/sign-in">
            <li>Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
