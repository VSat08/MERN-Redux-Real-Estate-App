import React, { useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { PiTrendUpBold } from "react-icons/pi";
import { HiHome } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { GrDiamond } from "react-icons/gr";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

import SecondaryFooter from "../components/SecondaryFooter";
import BottomNav from "../components/BottomNav";
import PrimaryFooter from "../components/PrimaryFooter";

import { motion } from "framer-motion";
import { container, fadeIn, fadeOut, item } from "../variants";

export default function Home() {
  const navigate = useNavigate();
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [search, setsearch] = useState("");

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-28 overflow-hidden">
      {/* top */}
      <div className="flex flex-col gap-6 justify-center max-w-6xl mx-auto pt-32 pb-8 px-6 md:px-4 lg:px-3  text-center relative ">
        <motion.img
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          alt="floating house 1"
          src="https://raw.githubusercontent.com/VSat08/image-utils/main/3d-rendering-isometric-house.png"
          className=" w-60 md:w-80  absolute -top-8  md:-top-16 md:right-80 -z-10"
        />
        <motion.img
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          alt="floating house 2"
          src="https://raw.githubusercontent.com/VSat08/image-utils/main/3d-rendering-isometric-house%20(2).png"
          className=" w-28 md:w-60 lg:w-80  absolute top-36  md:top-28 right-0 -z-10 "
        />
        <motion.h1
          variants={fadeIn("up", 0.2, 1.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-black/85"
        >
          Find your next{" "}
          <span className="text-transparent bg-gradient-to-r from-[#FC501E] to-[#FBA930] bg-clip-text">
            perfect
          </span>
          <br />
          place with ease
        </motion.h1>

        <motion.div
          variants={fadeIn("up", 0.2, 1.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          className="text-gray-600 font-medium text-xs sm:text-sm max-w-xl mx-auto"
        >
          AbodeAlly will help you find your home fast, easy and comfortable. Our
          expert support are always available.
        </motion.div>

        <div className=" w-full  ">
          {/* searchbox and button */}
          <div className="flex items-center gap-2 justify-center  ">
            {/* searchbox */}

            <motion.form
              variants={fadeIn("down", 0.2, 0, 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{
                once: false,
                amount: 0.7,
              }}
              id="homepage-search"
              onSubmit={() => navigate(`/search?searchTerm=${search}`)}
            >
              <div className="flex items-center gap-2 bg-white/30 md:w-96 rounded-3xl py-2 sm:py-2.5 md:py-3 px-4 border  border-gray-300 shadow-2xl ">
                <BiSearchAlt className="text-xl" />
                <input
                  type="text"
                  className=" bg-transparent w-full  text-xs sm:text-sm p-0 outline-none"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  placeholder="search your comfort zone"
                />
                <VscSettings className="text-xl" />
              </div>
            </motion.form>

            <motion.div
              variants={fadeIn("up", 0.2, 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{
                once: false,
                amount: 0.7,
              }}
            >
              <Link
                to={`/search?searchTerm=${search}`}
                className="bg-black/90 text-neutral-100 font-light md:font-medium rounded-full text-xs py-3 sm:text-sm px-4 sm:px-6 md:px-8"
              >
                Explore
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* swiper */}
      <motion.div
        variants={fadeIn("up", 0.2, 0, 1.5)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        className="my-4 max-w-7xl mx-auto"
      >
        <Swiper
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className=""
        >
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <img
                  alt="image slides"
                  src={`${listing.imageUrls[0]}`}
                  className=" h-[150px] w-full sm:h-[200px] md:h-[300px] lg:h-[350px] object-cover rounded-xl sm:rounded-3xl shadow-xl"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </motion.div>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto px-6 md:px-4 lg:px-3  flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <motion.div
            className="container"
            variants={container()}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.1,
            }}
          >
            <motion.div
              variants={item("left", 1)}
              className="flex items-center justify-between my-6 "
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black/85 tracking-tight">
                Hot Deals
              </h2>
              <Link
                to={"/search?offer=true"}
                className="flex items-center gap-1 rounded-full border border-black p-2 px-2 sm:px-4 text-xs sm:text-sm w-fit group"
              >
                Check more{" "}
                <PiTrendUpBold className="group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-200 ease-in-out" />
              </Link>
            </motion.div>

            <motion.div
              variants={item("up", 1)}
              className="flex flex-wrap gap-4 "
            >
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {rentListings && rentListings.length > 0 && (
          <motion.div
            variants={container()}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.1,
            }}
          >
            <div className="flex items-center justify-between my-6 ">
              <motion.h2
                variants={item("left", 1)}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black/85 tracking-tight"
              >
                Rental Gems
              </motion.h2>
              <motion.div variants={item("right", 1)}>
                <Link
                  to={"/search?type=rent"}
                  className="flex items-center gap-1 rounded-full border border-black p-2 px-2 sm:px-4 text-xs sm:text-sm w-fit group"
                >
                  Check more{" "}
                  <PiTrendUpBold className="group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-200 ease-in-out" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              variants={item("up", 1)}
              className="flex flex-wrap gap-4 "
            >
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {saleListings && saleListings.length > 0 && (
          <motion.div
            variants={container()}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.1,
            }}
          >
            <div className="flex items-center justify-between my-6 ">
              <motion.h2
                variants={item("left", 1)}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black/85 tracking-tight"
              >
                Buy Now
              </motion.h2>
              <motion.div variants={item("right", 1)}>
                <Link
                  to={"/search?type=sale"}
                  className="flex items-center gap-1 rounded-full border border-black p-2 px-2 sm:px-4 text-xs sm:text-sm w-fit group"
                >
                  Check more{" "}
                  <PiTrendUpBold className="group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-200 ease-in-out" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={item("up", 1)}
              className="flex flex-wrap gap-4 "
            >
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Advertisment */}
      <div className="max-w-6xl mx-auto px-6 md:px-4 lg:px-3  py-28 flex flex-col md:flex-row items-center ">
        <motion.div
          variants={fadeIn("up-left", 0.2, 0, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          className="relative "
        >
          <img
            alt="floating house 3"
            src="https://raw.githubusercontent.com/VSat08/image-utils/main/three-dimensional-house-model.png"
            className="object-cover w-[600px]"
          />
          <img
            alt="floating house 4"
            src="https://raw.githubusercontent.com/VSat08/image-utils/main/3d-rendering-isometric-house%20(1).png"
            className="object-cover w-48 -mt-44"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("up-left", 0.2, 0, 1.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.1,
          }}
          className="flex flex-col gap-6 flex-1 text-left  lg:text-right relative "
        >
          <img
            src="https://raw.githubusercontent.com/VSat08/image-utils/e93380af34c9785124d7e5e58657b286f67839ee/Handy%20Star.svg"
            alt="stars"
            className="w-6 absolute right-20 -top-12 animate-spin animate-infinite animate-duration-[4000ms] "
          />
          <img
            src="https://raw.githubusercontent.com/VSat08/image-utils/e93380af34c9785124d7e5e58657b286f67839ee/Handy%20Star.svg"
            alt="stars"
            className="w-10 absolute right-10 -top-24 animate-spin animate-infinite animate-duration-[5000ms] "
          />
          <img
            src="https://raw.githubusercontent.com/VSat08/image-utils/e93380af34c9785124d7e5e58657b286f67839ee/Handy%20Star.svg "
            alt="stars"
            className="w-16 absolute right-2 -top-16 animate-spin animate-infinite animate-duration-[6000ms] "
          />
          <h1 className=" text-xl sm:text-2xl md:text-3xl font-black ">
            Search For <br />{" "}
            <span className=" text-4xl sm:text-5xl md:text-6xl">
              {" "}
              Properties
            </span>
          </h1>
          <p className="  leading-6 font-sans md:text-lg">
            Find the perfect place for you. Our advanced search tool helps you
            browse thousands of listings to find your ideal home! Whether you're
            looking for a cozy apartment in the city, a spacious family house in
            the suburbs, or a luxurious villa with stunning views, we have
            options to suit every lifestyle and budget. Easily refine your
            search with detailed filters to discover properties that meet all
            your specific needs. Start your journey to a new home today with
            just a few clicks.
          </p>
        </motion.div>
      </div>

      {/* why abode ally cards */}
      <div className="max-w-6xl mx-auto px-6 md:px-4 lg:px-3  flex flex-col gap-12 my-8">
        <motion.h1
          variants={fadeIn("down", 0.2, 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          className="  sm:text-lg md:text-xl font-semibold text-gray-800 text-center md:text-left"
        >
          Your All-in-One Home Finding Solution <br />{" "}
          <span className=" text-4xl sm:text-5xl md:text-7xl font-extrabold text-black/90">
            {" "}
            AbodeAlly
          </span>
        </motion.h1>

        <motion.div
          variants={container()}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: false,
            amount: 0.1,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 items-center"
        >
          {/* card one */}
          <motion.div
            variants={item("left", 1.5)}
            className=" rounded-[1.7rem] bg-gradient-to-b from-[#FF8517] to-[#FFD02A] p-1 md:scale-90 "
          >
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 lg:p-8   ">
              <div className="flex flex-col gap-1 ">
                <HiHome className="text-3xl " />
                <p className="text-sm font-medium ">Wide Range of Properties</p>
                <h2 className="text-xl md:text-2xl font-bold ">
                  Extensive Listings
                </h2>
              </div>

              <p className="font-medium text-xs sm:text-sm">
                Whether you're looking for a charming starter home or a
                luxurious estate, you'll find it here.
              </p>

              <Link
                to="/"
                className="text-sm md:text-base font-semibold flex items-center gap-1 "
              >
                Explore Listings <PiTrendUpBold className="text-xl" />
              </Link>
            </div>
          </motion.div>

          {/* card two */}
          <motion.div
            variants={item("up", 1.8)}
            className=" rounded-[1.7rem] bg-gradient-to-b from-[#FF8517] to-[#FFD02A] p-1 md:scale-110 shadow-2xl shadow-black/15"
          >
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 lg:p-8   ">
              <div className="flex flex-col gap-1">
                <MdSpaceDashboard className="text-3xl " />
                <p className="text-sm font-medium ">
                  Intuitive Search Experience{" "}
                </p>
                <h2 className="text-xl md:text-2xl font-bold ">
                  User-Friendly Tools
                </h2>
              </div>

              <p className="font-medium text-xs sm:text-sm md:line-clamp-4 ">
                Advanced search and filter tools make it simple to find
                properties that meet all your criteria. Enjoy detailed property
                information, virtual tours, and much more !
              </p>

              <Link
                to="/"
                className="text-sm md:text-base font-semibold flex items-center gap-1"
              >
                Search your dream place <PiTrendUpBold className="text-xl" />
              </Link>
            </div>
          </motion.div>

          {/* card three */}
          <motion.div
            variants={item("right", 1.5)}
            className=" rounded-[1.7rem] bg-gradient-to-b from-[#FF8517] to-[#FFD02A] p-1 md:scale-90"
          >
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 lg:p-8   ">
              <div className="flex flex-col gap-1 ">
                <GrDiamond className="text-3xl " />
                <p className="text-sm font-medium ">Expert Agents </p>
                <h2 className="text-xl md:text-2xl font-bold ">
                  Trusted Guidance
                </h2>
              </div>

              <p className="font-medium text-xs sm:text-sm">
                We are committed to helping you find the perfect property.
              </p>

              <Link
                to="/"
                className="text-sm md:text-base font-semibold flex items-center gap-1 "
              >
                Seek Help <PiTrendUpBold className="text-xl" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* testimonials */}
      <div
        className="relative  "
        style={{
          backgroundImage:
            'url("https://raw.githubusercontent.com/VSat08/image-utils/86584449bed8d608b5353526c0cf1540c5598bae/bg-black-2.svg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: " cover",
          backgroundPosition: "100% center",
          height: "1100px",
          width: "100%",
          minHeight: "100vh", // Adjust this value as needed
        }}
      >
        <motion.div
          variants={fadeOut("up", 0.1, 1, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="bg-[linear-gradient(to_bottom,#090909,#0a0a0a,#000000)] w-full absolute inset-x-0 bottom-32  min-h-44 "
        ></motion.div>

        <motion.div
          variants={fadeIn("up", 0.2, 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: false,
            amount: 0.7,
          }}
          className="max-w-7xl mx-auto p-3  pt-32 md:pt-56 lg:py-32 flex flex-col  gap-12 md:gap-28 lg:gap-32 px-6 md:px-4 lg:px-3  "
        >
          <h1 className=" text-3xl sm:text-xl md:text-2xl font-semibold text-white text-center md:text-left">
            People say <br />{" "}
            <span className=" text-4xl sm:text-5xl md:text-7xl font-extrabold ">
              {" "}
              that ...
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 items-center  justify-items-center ">
            {/* card one */}
            <div className=" rounded-[1.7rem] border-2 border-[#FF8517] relative max-w-xs sm:max-w-md lg:scale-95">
              <img
                src="https://raw.githubusercontent.com/VSat08/image-utils/5088eed69fae0597131204f694a58d70e09e694a/quote.svg"
                alt="quote"
                className="absolute -top-14 md:-top-20 w-20 md:w-32 left-0 z-10"
              />
              <div className="flex flex-col gap-4 rounded-3xl bg-transparent text-slate-50/90 backdrop-blur-sm border-2 border-white/75 p-6 lg:p-12  -translate-x-2 -translate-y-2 ">
                <p className="text-xs sm:text-sm italic font-light tracking-wider">
                  Finding my dream home was a breeze with AbodeAlly. Their
                  search tools and expert agents made the entire process smooth
                  and enjoyable.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915892.jpg?t=st=1720703982~exp=1720707582~hmac=9a92e0fc47261e6c60915ba2039f8ae201b312fba1ad0519912a4b8c1e87620b&w=740"
                    alt="client 1"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-medium"> —Farkas Niager</p>
                    <p className="text-sm">UX Designer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* card two */}
            <div className=" rounded-[1.7rem] bg-gradient-to-b from-[#FF6565]  via-[#FF912D]  from-10%  to-[#FFD02A] relative max-w-xs sm:max-w-md lg:scale-110">
              <img
                src="https://raw.githubusercontent.com/VSat08/image-utils/5088eed69fae0597131204f694a58d70e09e694a/quote.svg"
                alt="quote"
                className="absolute -top-14 md:-top-20 w-20 md:w-32 left-0 z-10"
              />
              <div className="flex flex-col gap-4 rounded-3xl bg-white/35 backdrop-blur-[3px] border-2 border-white/75 p-6 lg:p-12  -translate-x-2 -translate-y-2 ">
                <p className=" text-xs sm:text-sm italic font-light tracking-wider">
                  Finding my dream home was a breeze with AbodeAlly. Their
                  search tools and expert agents made the entire process smooth
                  and enjoyable.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915892.jpg?t=st=1720703982~exp=1720707582~hmac=9a92e0fc47261e6c60915ba2039f8ae201b312fba1ad0519912a4b8c1e87620b&w=740"
                    alt="client 1"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-medium"> —Farkas Niager</p>
                    <p className="text-sm">UX Designer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* card three */}
            <div className=" rounded-[1.7rem] border-2 border-[#FF8517] relative max-w-xs sm:max-w-md lg:scale-95">
              <img
                src="https://raw.githubusercontent.com/VSat08/image-utils/5088eed69fae0597131204f694a58d70e09e694a/quote.svg"
                alt="quote"
                className="absolute -top-14 md:-top-20 w-20 md:w-32 left-0 z-10"
              />
              <div className="lex flex-col gap-4 rounded-3xl bg-transparent text-slate-50/90 backdrop-blur-sm border-2 border-white/75 p-6 lg:p-12  -translate-x-2 -translate-y-2 ">
                <p className=" text-xs sm:text-sm italic font-light tracking-wider">
                  Finding my dream home was a breeze with AbodeAlly. Their
                  search tools and expert agents made the entire process smooth
                  and enjoyable.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915892.jpg?t=st=1720703982~exp=1720707582~hmac=9a92e0fc47261e6c60915ba2039f8ae201b312fba1ad0519912a4b8c1e87620b&w=740"
                    alt="client 1"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-medium"> —Farkas Niager</p>
                    <p className="text-sm">UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", 0.3, 1, 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: false,
          amount: 0.8,
        }}
      >
        {/* footer */}
        <PrimaryFooter />
        {/* secondary footer */}

        <hr className="bg-gray-300  w-full" />
        <SecondaryFooter />
      </motion.div>

      {/* bottom nav */}
      <div className="my-[4.5rem] md:m-0">
        <BottomNav />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-20 right-4 bg-gradient-to-br from-orange-400/70 to-yellow-400/50 backdrop-blur-md text-black font-medium border-2 border-gray-300 p-3 rounded-full shadow-2xl hover:opacity-90 focus:outline-none text-sm"
        >
          scroll to top &#8657;
        </button>
      )}
    </div>
  );
}
