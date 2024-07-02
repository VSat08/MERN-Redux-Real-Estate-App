import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Search() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className=" p-4 flex flex-col md:flex-row gap-6  max-w-7xl mx-auto">
      {/* left */}
      <div className=" p-4 md:p-7 bg-gradient-to-br from-white/40 to-slate-50/20  rounded-3xl shadow-2xl shadow-black/10  ">
        <form
          className={`flex flex-col gap-4 ${formOpen ? "" : "h-14"} ${
            !formOpen && "overflow-hidden"
          }  md:h-auto md:overflow-visible transition-height duration-700 ease-in-out `}
        >
          <input
            type="text"
            id="searchTerm"
            placeholder="Search listings here..."
            className=" border-t-slate-400/20 rounded-xl px-4 py-2 w-full bg-white/20 backdrop-blur-md border border-white/20  p-2 outline-none shadow-md"
          />
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-4 " />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4 " />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4 " />
              <span> Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4 " />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities: </label>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4 " />
              <span> Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4 " />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort: </label>
            <select
              id="sort_order"
              className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-2 outline-none shadow-xl"
            >
              <option className="bg-white/20 backdrop-blur-md">
                Price high to low
              </option>
              <option className="bg-white/20 backdrop-blur-md">
                Price low to high
              </option>
              <option className="bg-white/20 backdrop-blur-md">Latest</option>
              <option className="bg-white/20 backdrop-blur-md">Oldest</option>
            </select>
          </div>
          <button className="  hover:opacity-70 transition-transform duration-200 ease-out bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl shadow-orange-400/35 shadow-lg p-2 cursor-pointer font-medium border-none">
            Search
          </button>
        </form>

        <div className="  md:hidden space-y-0 my-1">
          <p className="text-center font-semibold text-sm text-slate-600">
            more filters
          </p>
          <button className=" w-full " onClick={() => setFormOpen(!formOpen)}>
            <IoIosArrowDown
              className={`transition-all duration-500 ease-in-out mx-auto text-orange-600 text-2xl ${
                formOpen && "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/* right */}
      <div className="">
        <h1 className="text-4-xl font-extrabold text-slate-800 text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
          Listing Results
        </h1>
      </div>
    </div>
  );
}
