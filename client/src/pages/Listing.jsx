import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import "ldrs/helix";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
        <div className="absolute -top-14 -z-10 left-0 w-full">
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
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat `,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
