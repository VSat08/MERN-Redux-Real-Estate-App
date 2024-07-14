import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import "ldrs/helix";

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedLandLord = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setError(false);
        setLandLord(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchedLandLord();
  }, [listing.userRef]);
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {loading && (
        <div className="flex items-center justify-center">
          <l-helix size="40" speed="5" color="orange"></l-helix>
        </div>
      )}

      {landLord && !error && !loading && (
        <div className="flex flex-col gap-3 my-4">
          <p className="font-bold text-3xl text-center">{listing.name}</p>

          <div className="flex justify-between items-center gap-3 my-3 flex-wrap">
            <div className=" flex gap-1 items-center justify-between bg-slate-50 flex-1 rounded-lg shadow-2xl shadow-black/90 border-2 full text-xs sm:text-sm">
              <p className="text-white font-medium  px-2 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-500 py-1.5 ">
                Owner
              </p>
              <p className="px-1  ">{landLord.username}</p>
            </div>
            <div className=" flex gap-1 items-center justify-between bg-slate-50 flex-1 rounded-lg shadow-2xl shadow-black/90 border-2 w-full text-xs sm:text-sm">
              <p className="text-white font-medium  px-2 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-500 py-1.5  ">
                mail
              </p>
              <p className="px-1  truncate ">{landLord.email}</p>
            </div>
          </div>

          <p className="font-medium text-xs sm:text-sm">
            Contact <span className="text-orange-500">{landLord.username}</span>{" "}
            with a lovely greeting!
          </p>

          <textarea
            onChange={handleOnChange}
            placeholder="Interact with the owner! Send a message now."
            value={message}
            name="message"
            id="message"
            rows="2"
            className="placeholder:text-sm rounded-2xl border-slate-300 border-2 p-3 shadow-2xl w-full "
          ></textarea>
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-black text-neutral-100 text-center rounded-xl p-2 hover:opacity-85"
          >
            Send
          </Link>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-4 ">
          <img
            src="https://i.pinimg.com/564x/07/61/51/076151bcc1cdaf7767c4eab43a46bffc.jpg"
            className=" w-28 rounded-full animate-bounce animate-infinite animate-duration-[4500ms] animate-ease-linear animate-alternate"
            alt="error"
          />
          <div className="text-center ">
            <p className="text-lg font-medium">
              Oh ho! I think there is something wrong....{" "}
            </p>
            <p
              className="text-sm flex items-center justify-center gap-2 underline underline-offset-4 text-orange-400 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              Why dont we start from the fresh !?
              <p className="inline-block ">
                <FaArrowTrendUp className="text-xl text-slate-500" />
              </p>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
