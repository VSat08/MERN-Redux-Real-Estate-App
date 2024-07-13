import React from "react";
import { BiGlobe } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";

export default function SecondaryFooter() {
  return (
    <>
      <div className="max-w-6xl mx-auto  p-3 flex  justify-between items-start md:items-center gap-2 flex-wrap-reverse px-6 md:px-4 lg:px-3  ">
        <div className="text-gray-600 font-medium text-sm flex md:items-center gap-2 md:gap-3 flex-row flex-wrap ">
          <p>© 2024</p>
          <p>AbodeAlly</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Sitemap</p>
          <p>Company</p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex place-items-center gap-1 font-semibold text-sm">
            <BiGlobe className="text-lg" />
            English
          </div>

          <div className="flex place-items-center gap-1 font-semibold text-sm">
            <IoHelpBuoyOutline className="text-lg" />
            Help & Support
          </div>
        </div>
      </div>

      <div className="text-white bg-black/90 flex items-center gap-2 justify-center w-full p-2 text-sm">
        <p> Plant a tree for better earth</p>
        <PiPlant className="text-lg" />
      </div>
    </>
  );
}
