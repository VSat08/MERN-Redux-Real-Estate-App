import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full px-8 mx-auto  md:max-w-3xl lg:max-w-6xl">
      <div className="absolute -top-14 -z-10 left-0 w-full">
        <img
          src="https://img.freepik.com/premium-vector/set-indian-men-women-avatars-smiling-male-female-cartoon-characters-collection-horizontal-portrait_48369-25012.jpg?w=1480"
          alt=""
          className="object-cover w-full h-80"
        />
      </div>
      <div className="flex items-center gap-1  mt-4 text-white font-bold">
        <RiArrowGoBackFill />
        Home
      </div>
      <div className="p-4 flex w-full mx-auto  gap-1 flex-wrap ">
        {/* left columns */}
        <div className="bg-[rgba(255,255,255,.3)] backdrop-blur-sm w-full md:w-1/3  flex flex-col py-4 rounded-2xl ">
          <img
            className="rounded-full h-24 w-24 object-cover self-center mt-2"
            src={currentUser.avatar}
            alt="profile"
          />
          <div className="self-center space-y-4">
            <h1 className="leading-snug text-2xl md:text-xl lg:text-2xl font-extrabold my-2">
              Hi there!
              <span className="text-4xl md:text-2xl lg:text-4xl block">
                {currentUser.username}
              </span>
            </h1>
            <p className="font-medium text-sm">{currentUser.email}</p>
          </div>
        </div>
        {/* right column */}
        <div className="w-full md:w-3/5 mx-auto md:max-w-md">
          <h1 className="leading-snug text-xl md:text-2xl lg:text-4xl  font-extrabold my-2 ">
            Let's
            <span className="text-3xl md:text-4xl lg:text-5xl block">
              Update Your Profile!
            </span>
          </h1>
          <form className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
