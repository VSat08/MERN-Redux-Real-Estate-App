import React from "react";
import { Link } from "react-router-dom";
import { FaLocationPin } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white  rounded-3xl hover:shadow-2xl hover:shadow-gray-400/40 hover:-translate-y-2  transition-all border-r border-b border-gray-200 duration-300 ease-in-out overflow-hidden w-full sm:w-[280px]   md:w-[270px] mx-auto lg:mx-0">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listingcover"
          className="h-[180px] sm:h-[180px] w-full object-cover  transition-all duration-300 ease-in-out rounded-3xl "
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-800 truncate">
            {listing.name}
          </p>

          <div className="flex gap-1 items-center">
            <FaLocationPin className="text-black/70 text-sm" />
            <p className="w-full truncate text-sm font-medium text-gray-600">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-slate-600 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-medium bg-gray-100 text-black  rounded-full px-2 py-0.5  border border-gray-200 text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}{" "}
              <IoBed className="text-black" />
            </div>

            <div className="flex items-center gap-1  font-medium bg-gray-100 rounded-full px-2 py-0.5 text-black border border-gray-300 text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
              <FaBath className="text-black" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
