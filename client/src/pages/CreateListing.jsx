import React from "react";
import { IoMdAddCircle } from "react-icons/io";

export default function CreateListing() {
  return (
    <main className="px-4 py-4 md:px-20 lg:px-28 mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center my-7">
        Lets create a
        <span className="text-5xl ml-32 md:text-6xl lg:text-7xl font-extrabold p-2 my-1 md:my-2 block bg-gradient-to-r from-yellow-400 via-orange-500  to bg-red-500   text-transparent bg-clip-text ">
          Listing!
        </span>
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-3"
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-3 min-h-32"
          />
          <input
            type="text"
            id="adddress"
            placeholder="Adddress"
            required
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-3"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" className="w-4 h-4 " />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" className="w-4 h-4 " />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" className="w-4 h-4 " />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" className="w-4 h-4 " />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" className="w-4 h-4 " />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <div>
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <div>
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover(max:6)
            </span>
          </p>
          <div className="flex items-center gap-4">
            <input
              className="relative  w-full  flex-auto rounded-2xl border border-solid border-neutral-300 bg-clip-padding px-3 py-0.5 text-base font-normal text-neutral-400 transition duration-300 ease-in-out shadow-2xl shadow-neutral-800/25 file:text-xs file:-mx-2 file:my-2 file:shadow-md file:shadow-orange-300/60 file:overflow-hidden file:rounded-xl file:border-0 file:border-solid file:border-inherit file:bg-gradient-to-r file:from-orange-500  file:to-yellow-500   file:px-3 file:py-[0.4rem] file:text-neutral-100 file:transition file:duration-150 file:ease-in-out  file:[margin-inline-end:0.75rem] hover:file:opacity-70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none cursor-pointer file:cursor-pointer file:hover:scale-105 file:hover:rounded-2xl file:hover:shadow-orange-500/70 file:hover:shadow-xl   "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className=" bg-gradient-to-r from-gray-900 via-black to-gray-900 p-2.5 px-4 rounded-xl cursor-pointer font-medium border-none text-white shadow-xl shadow-black/20  text-sm md:text-base flex items-center gap-1 justify-center group-hover:gap-[7px] disabled:opacity-80">
              Upload
            </button>
          </div>{" "}
          <button className=" bg-gradient-to-r from-gray-900 via-black to-gray-900 p-2.5 px-4 rounded-xl cursor-pointer font-medium border-none text-white shadow-xl shadow-black/20  text-sm md:text-base flex items-center gap-1 justify-center  disabled:opacity-80">
            <IoMdAddCircle />
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
