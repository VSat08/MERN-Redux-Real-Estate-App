import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="py-4 px-12 md:px-16 max-w-lg mx-auto">
      <h1
        className="
        leading-snug
      text-4xl
    
      font-extrabold 
      my-12
      "
      >
        Yohoo!
        <span
          className="text-6xl
        block"
        >
          Sign Up!
        </span>
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />

        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-3 disabled:opacity-20">
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        <p className=" text-center font-medium">
          Hmm, Already a User?
          <Link to="/sign-in" className=" mx-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500  text-transparent bg-clip-text">
            Login in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
