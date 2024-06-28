import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import "ldrs/helix";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <l-helix size="70" speed="5" color="orange"></l-helix>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <img
            src="https://i.pinimg.com/564x/07/61/51/076151bcc1cdaf7767c4eab43a46bffc.jpg"
            className="h-28 w-28 rounded-full "
            alt="error"
          />
          <div className="text-center ">
            <p className="text-lg font-medium">
              Oh ho! I think there is something wrong....{" "}
            </p>
            <p className="text-sm flex items-center justify-center gap-2 underline underline-offset-4 text-orange-400">
              Why dont we start from the fresh !?
              <Link to="/" className="inline-block">
                <FaArrowTrendUp className="text-xl text-slate-500" />
              </Link>
            </p>
          </div>
        </div>
      )}

      {listing && !loading && !error && (
        <div className="absolute -top-14 -z-20 left-0 w-full">
          <Swiper
            navigation
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
          >
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[450px]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/60 "></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-5xl mx-auto p-3 my-7 relative z-20 -mt-28 sm:-mt-24 gap-6">
            <div className="space-y-2">
              <p className=" text-xl sm:text-3xl md:text-4xl lg:text-5xl  text-white font-semibold">
                {listing.name} - $
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>
              <p className="flex items-center gap-2 text-white  text-sm font-medium">
                <FaMapMarkerAlt className="text-slate-300" />
                {listing.address}
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <p className="bg-orange-400 w-full max-w-[200px] text-white text-center p-1 rounded-xl">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-black/90 w-full max-w-[200px] text-white text-center p-1 rounded-xl">
                  ${+listing.regularPrice - +listing.discountPrice} OFF !
                </p>
              )}
            </div>
            <p className="text-slate-800 text-sm ">
              <span className="font-semibold text-black">Description : </span>
              {listing.description}
            </p>
            <ul className="text-slate-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
