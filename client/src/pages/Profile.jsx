import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="p-4 max-w-sm mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg ">
      <h1 className="leading-snug text-3xl font-extrabold my-7 text-center">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover self-center mt-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          id="username"
          type="text"
          placeholder="username"
          className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-lg shadow-gray-300"
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-lg shadow-gray-300"
        />
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-lg shadow-gray-300 w-full"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiShowAlt /> : <BiHide />}
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500  to-yellow-300  text-white p-3 rounded-xl shadow-lg">
          Update <MdTipsAndUpdates className="text-xl" />
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span className="cursor-pointer  font-medium text-sm flex items-center gap-1">
          Delete Account <FaTrash />
        </span>
        <span className="cursor-pointer text-red-600 font-medium text-sm flex items-center gap-1">
          Sig out <FiLogOut />
        </span>
      </div>
    </div>
  );
}
