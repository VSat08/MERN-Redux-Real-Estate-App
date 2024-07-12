import React, { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "/Logo.png";
import { BiSearchAlt } from "react-icons/bi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

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
      } else if (location.pathname === "/search") {
        setShowHeaderSearch(true);
      }
    };

    handleScroll(); // Call once immediately to set initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Add location.pathname as a dependency

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="  px-2.5 md:px-4 bg-white fixed top-0 inset-x-0 w-full z-[100] ">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 min-h-[4.5rem] px-6  my-3  relative  ">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-24 sm:w-32 hidden sm:block" />
        </Link>

        {showHeaderSearch && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/40 p-2 px-4 md:px-6 rounded-3xl flex justify-between items-center border  border-slate-100 shadow-2xl "
          >
            <input
              type="text"
              placeholder="search your comfrot zone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full sm:w-48 md:w-64 px-2 py-1 text-xs sm:text-sm  text-neutral-700 placeholder:text-gray-400 placeholder:font-light"
            />
            <button>
              <BiSearchAlt className="text-slate-600 text-xl" />
            </button>
          </form>
        )}

        <ul className="flex gap-4 items-center font-semibold ">
          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>

          {/* <Link to="/profile"> */}
          {currentUser ? (
            <div className="relative bg-gray-50 border border-slate-200 rounded-full  p-2 px-3">
              <div className="flex items-center gap-1 ">
                <CgMenuRightAlt
                  className="text-2xl cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                <div className="flex items-start gap-1">
                  <p className="text-xs text-gray-600 py-2 w-16 truncate ">
                    Hi {currentUser.username} !
                  </p>
                  <img
                    className="rounded-full h-9 w-9 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </div>
              </div>
              {/* dropdown */}
              <div
                className={`p-4 flex flex-col gap-3 rounded-xl bg-gradient-to-br from-white to-white/50 w-full backdrop-blur-md absolute top-14 z-10 shadow-2xl transition-all duration-500 ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  Messages
                </p>
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  My Listings
                </p>

                <Link
                  to="/profile"
                  className="text-xs sm:text-sm font-medium text-gray-800"
                  onClick={handleDropdownItemClick}
                >
                  Account
                </Link>
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  About
                </p>
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  AdobeAlly
                </p>
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  {" "}
                  Help & Support
                </p>
                <p
                  onClick={handleDropdownItemClick}
                  className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <li className="text-xs sm:text-base">Sign in</li>
          )}
          {/* </Link> */}
        </ul>
      </div>
      <hr className="bg-gray-100 h-[1px] w-full" />
    </header>
  );
}
