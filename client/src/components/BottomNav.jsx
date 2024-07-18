import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegMessage } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

export default function BottomNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const getLinkClass = (path) => {
    const baseClass = "flex flex-col items-center";
    return location.pathname === path
      ? `${baseClass} text-orange-500`
      : `${baseClass} text-gray-500`;
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (windowHeight + currentScrollY >= documentHeight - 10) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={`px-2.5 md:px-4 bg-white fixed bottom-0 inset-x-0 w-full z-[100] md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="justify-between max-w-6xl mx-auto py-3 px-6 relative flex gap-4 items-center text-xs sm:text-sm">
        <Link className={getLinkClass("/")} to="/">
          <RiHomeLine className="text-2xl" />
          Home
        </Link>

        <Link className={getLinkClass("/search")} to="/search">
          <BiSearchAlt className="text-2xl" />
          Search
        </Link>

        <Link className={getLinkClass("/message")} to="/">
          <FaRegMessage className="text-2xl" />
          Message
        </Link>

        <Link className={getLinkClass("/profile")} to="/profile">
          <VscAccount className="text-2xl" />
          Account
        </Link>
      </div>
    </div>
  );
}
