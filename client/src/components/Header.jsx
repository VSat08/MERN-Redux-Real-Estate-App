import React, { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "/Logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { motion } from "framer-motion";
import { fadeIn } from "../variants";

import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { VscSettings } from "react-icons/vsc";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const homePageSearch = document.getElementById("homepage-search");
      if (homePageSearch) {
        const rect = homePageSearch.getBoundingClientRect();
        setShowHeaderSearch(rect.top <= 0);
      } else if (
        location.pathname === "/search" ||
        location.pathname === "/profile"
      ) {
        setShowHeaderSearch(true);
      }
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); 

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      navigate("/");

      Swal.fire({
        position: "top",
        icon: "success",
        toast: "true",
        timerProgressBar: "true",
        title: "Signed out",
        showConfirmButton: false,
        timer: 3000,
        color: "#fff",
        padding: "5px",
        background: "#1a1a1a",
      });
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header
      className={`${
        (location.pathname == "/sign-in" || location.pathname == "/sign-up") &&
        "hidden"
      }  px-2.5 md:px-4 bg-white fixed top-0 inset-x-0 w-full z-[100] `}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 min-h-[4.5rem] md:px-6  px-3 my-3  relative gap-2 ">
        <motion.div
          variants={fadeIn("down", 0.2, 1.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
          }}
        >
          <Link to="/">
            <img
              loading="lazy"
              src={Logo}
              alt="logo"
              className="w-24 sm:w-32 hidden sm:block"
            />
          </Link>
        </motion.div>

        {showHeaderSearch && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/40 p-2 px-4 md:px-6 rounded-3xl flex justify-between items-center border  border-slate-300 shadow-2xl  flex-1 sm:flex-none"
          >
            <VscSettings className="" />
            <input
              type="text"
              placeholder="search your comfort zone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full sm:w-48 md:w-64 px-2 py-1 text-xs sm:text-sm  text-neutral-700 placeholder:text-gray-400 placeholder:font-light"
            />
            <button>
              <BiSearchAlt className="text-slate-600 text-xl" />
            </button>
          </form>
        )}

        <motion.ul
          variants={fadeIn("down", 0.3, 0, 1.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
          }}
          className="flex gap-1 sm:gap-2  items-center font-semibold "
        >
          <HiOutlineLocationMarker className="text-2xl" />

          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>

          {currentUser ? (
            <div className="relative bg-gray-50 border border-slate-200 rounded-full  p-2 px-3">
              <div className="flex items-center gap-2 ">
                <CgMenuRightAlt
                  className="text-2xl cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                <div className="flex items-start gap-0">
                  <p className="text-xs text-gray-800 py-2 w-16 truncate ">
                    Hi {currentUser.username} !
                  </p>
                  <img
                    className="rounded-full h-9 w-9 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </div>
              </div>
              <div
                className={`p-4 flex flex-col gap-3 border-2 border-gray-50 rounded-xl bg-gradient-to-br from-white to-white/50 w-full backdrop-blur-md absolute top-14 z-50 shadow-2xl shadow-black/40 transition-all duration-200 ease-out ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                <p
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  Messages
                </p>

                <p
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  My Listings
                </p>
                <hr className="w-full " />
                <Link
                  to="/profile"
                  className="text-xs sm:text-sm font-medium text-gray-800"
                  onClick={() => setDropdownOpen(false)}
                >
                  Account
                </Link>
                <p
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  About
                </p>
                <hr className="w-full " />
                <p
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  AbodeAlly
                </p>
                <p
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  {" "}
                  Help & Support
                </p>
                <p
                  onClick={handleSignOut}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <Link to="/sign-in">
              <li className="text-sm sm:text-base text-white bg-black/90 rounded-full p-2 px-4">
                Sign in
              </li>
            </Link>
          )}
       
        </motion.ul>
      </div>
      <hr className="bg-gray-100 h-[1px] w-full" />
    </header>
  );
}
