import React from 'react'
import { PiInstagramLogoBold, PiFacebookLogo } from "react-icons/pi";
import { RiLinkedinFill } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import Logo from "/Logo.png";


export default function PrimaryFooter() {
  return (
    <footer className="max-w-6xl mx-auto  flex flex-col  md:flex-row items-start w-full justify-between py-8 gap-4 p-3 px-6 md:px-4 lg:px-3  ">
      <div className="flex flex-col items-end gap-1">
        <img alt="logo" src={Logo} className="w-40 md:w-44  lg:w-64" />
        <p className="text-gray-500 font-medium text-xs ">© 2024 AbodeAlly</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">Support</h3>
        <p className="text-sm my-1">Help Centre</p>
        <p className="text-sm my-1">Get help with a safety issue</p>
        <p className="text-sm my-1">Anti-discrimination</p>
        <p className="text-sm my-1"> Disability support</p>
        <p className="text-sm my-1">Cancellation options</p>
        <p className="text-sm my-1">Report neighbourhood concern</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">AdobeAlly</h3>
        <p className="text-sm my-1">AdobeAlly</p>
        <p className="text-sm my-1">Newsroom</p>
        <p className="text-sm my-1"> New features</p>
        <p className="text-sm my-1"> Careers</p>
        <p className="text-sm my-1">Investors</p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-medium text-sm md:text-base">Helpline</h3>
          <p className="text-sm my-1">Help Centre</p>
          <p className="text-sm my-1">Get help with a safety issue</p>
          <p className="text-sm my-1">Anti-discrimination</p>
          <p className="text-sm my-1"> Disability support</p>
          <p className="text-sm my-1">Cancellation options</p>
          <p className="text-sm my-1">Report neighbourhood concern</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium sm:text-xl text-base">Folow us:</h3>
          <div className="text-xl md:text-2xl flex items-center gap-2">
            <PiInstagramLogoBold />

            <PiFacebookLogo />
            <FiYoutube />

            <RiLinkedinFill />
          </div>
        </div>
      </div>
    </footer>
  );
}
