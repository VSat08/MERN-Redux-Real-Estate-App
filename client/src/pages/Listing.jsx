import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowTrendUp, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import "ldrs/helix";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { Modal } from "../components/Modal";
import { TbArrowBackUp } from "react-icons/tb";
import { IoCopyOutline, IoLogoWhatsapp } from "react-icons/io5";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaPencilAlt,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [link, setLink] = useState("");

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

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`,
      "_blank"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
      "_blank"
    );
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct sharing API for web
    alert(
      "Instagram sharing is not directly supported. You can copy the link and share it manually on Instagram."
    );
  };

  const contactOwner = () => {
    if (currentUser) {
      setIsOpen(true);
      setContact(true);
    } else {
      navigate("/sign-in");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
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
        <>
          <button
            onClick={handleGoBack}
            className="text-white font-bold absolute top-28 inset-x-8 z-20 flex items-center gap-1 mt-4 w-max"
          >
            <RiArrowGoBackFill />
            Go back
          </button>

          <div className="absolute -top-10 -z-20 left-0 w-full">
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

            {currentUser && listing.userRef === currentUser._id && (
              <div
                className="fixed top-32  right-[3%] z-50  cursor-pointer "
                onClick={() => {
                  navigate(`/update-listing/${listing._id}`);
                }}
              >
                <FaPencilAlt className="text-gray-200 text-xl" />
              </div>
            )}

            <div
              className="fixed bottom-24 md:bottom-10 right-[3%] z-50  rounded-full w-14 h-14 md:w-16 md:h-16 flex justify-center items-center bg-orange-400/70  backdrop-blur-sm shadow-xl shadow-orange-500/30  cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLink(window.location.href);
                setCopied(true);
              }}
            >
              <FaShare className="text-white" />
            </div>

            <div className="flex flex-col max-w-5xl mx-auto p-3 my-7 mb-20 md:mb-auto relative z-20 -mt-32 sm:-mt-28 gap-12">
              <div className="space-y-2">
                <p className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white font-light flex items-center flex-wrap gap-1">
                  {listing.name}
                  <span className="  text-xs bg-orange-500/80  rounded-lg p-1 px-2 font-medium">
                    ${" "}
                    {listing.offer
                      ? listing.discountPrice.toLocaleString("en-US")
                      : listing.regularPrice.toLocaleString("en-US")}
                    {listing.type === "rent" && " / month"}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-white  text-sm font-medium">
                  <FaMapMarkerAlt className="text-slate-300" />
                  {listing.address}
                </p>
              </div>

              <div className="flex gap-3 px-3  justify-between mb-8 items-start">
                {/* left div */}
                <div className="flex flex-col  mx-auto  gap-6 flex-1">
                  <div className="flex gap-4 mt-6 text-sm sm:text-base">
                    <p className="bg-orange-400 w-full max-w-[200px] text-white text-center p-2 rounded-xl">
                      {listing.type === "rent" ? "For Rent" : "For Sale"}
                    </p>
                    {listing.offer && (
                      <p className="bg-black/90 w-full max-w-[200px] text-white text-center p-2 rounded-xl">
                        ${+listing.regularPrice - +listing.discountPrice} OFF!
                      </p>
                    )}
                  </div>
                  <p className="text-slate-800 text-sm ">
                    <span className="font-semibold text-black">
                      Description :{" "}
                    </span>
                    {listing.description}
                  </p>
                  <ul className="text-slate-600 font-semibold text-xs sm:text-sm flex flex-wrap items-center gap-4 sm:gap-6">
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
                  {/* images */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4 md:items-start items-stretch lg:grid-cols-2 ">
                    {listing.imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt="listing iamges"
                        className="  rounded-lg shadow-md object-cover "
                      />
                    ))}
                  </div>
                </div>

                {/* right div */}
                <div className="fixed bottom-0 inset-x-0 md:sticky md:inset-0 md:top-20 flex-row items-center md:items-stretch justify-between flex md:flex-col  mx-auto  gap-6 bg-white  px-8 py-4 md:px-6 md:py-10 md:rounded-3xl shadow-2xl shadow-black/5 md:border-none border-t border-t-gray-300 ">
                  <p className="md:mt-4 text-xl font-medium">
                    $
                    {listing.offer
                      ? listing.discountPrice.toLocaleString("en-US")
                      : listing.regularPrice.toLocaleString("en-US")}
                    {listing.type === "rent" && " / month"}
                  </p>
                  {!currentUser ||
                  (currentUser && listing.userRef !== currentUser._id) ? (
                    <button
                      className="bg-gradient-to-r from-orange-400 to-yellow-500  rounded-lg p-3 md:px-8 md:py-1.5  text-white font-medium hover:opacity-70"
                      onClick={contactOwner}
                    >
                      Contact Owner
                    </button>
                  ) : (
                    <p>Hello Owner!</p>
                  )}
                  <p className="text-slate-500 -mt-3 text-sm text-center hidden md:block">
                    You won't be charged yet
                  </p>
                  <div className="justify-between hidden  md:flex">
                    <p>Total</p>
                    <p>
                      {" "}
                      $
                      {listing.offer
                        ? listing.discountPrice.toLocaleString("en-US")
                        : listing.regularPrice.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for contact */}
          <AnimatePresence>
            {isOpen && (
              <Modal>
                {/* <p>Modal Content</p> */}
                {contact ? (
                  <Contact listing={listing} />
                ) : (
                  <div className="flex items-center justify-center my-4 ">
                    <l-helix size="40" speed="5" color="orange"></l-helix>
                  </div>
                )}

                <button
                  className="absolute right-8 top-2 animate-wiggle animate-infinite"
                  onClick={() => setIsOpen(false)}
                >
                  <TbArrowBackUp className="text-4xl text-slate-600" />
                </button>
              </Modal>
            )}
          </AnimatePresence>

          {/* for copy */}
          <AnimatePresence>
            {copied && (
              <Modal>
                <div className="flex flex-col  gap-4">
                  <h1 className="text-2xl font-bold text-center">
                    Link copied !
                  </h1>

                  <div className="flex items-center shadow-2xl gap-3 justify-between bg-slate-50 rounded-md border-2  ">
                    <p className="truncate  p-2">{link}</p>
                    <p
                      className="bg-slate-100 p-2 rounded-e-md border-s-2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      <IoCopyOutline />
                    </p>
                  </div>

                  <p className="text-lg font-semibold  text-center mt-2">
                    Share with
                  </p>
                  <ul className="flex list-none gap-6 items-center mx-auto ">
                    <li className="cursor-pointer" onClick={shareToWhatsApp}>
                      <IoLogoWhatsapp className="text-2xl md:text-3xl text-green-500" />
                    </li>
                    <li className="cursor-pointer" onClick={shareToTwitter}>
                      <FaXTwitter className="text-2xl md:text-3xl text-black" />
                    </li>
                    <li className="cursor-pointer" onClick={shareToFacebook}>
                      <FaFacebookF className="text-2xl md:text-3xl text-blue-500" />
                    </li>
                    <li className="cursor-pointer" onClick={shareToInstagram}>
                      <img
                        src="https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png"
                        className="w-6 md:w-8 h-6 md:h-8"
                        alt="insta_share"
                      />
                    </li>
                  </ul>
                </div>

                <button
                  className="absolute right-8 top-2 animate-wiggle animate-infinite"
                  onClick={() => setCopied(false)}
                >
                  <TbArrowBackUp className="text-4xl text-slate-600" />
                </button>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
