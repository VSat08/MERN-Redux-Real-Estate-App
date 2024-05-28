import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAppleClick = async () => {
    alert("Still Working on...");
  };
  const handleGoogleClick = async () => {
    try {
      // alert("Google authenticated");
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could Not Authorize at this moment : )", error);
    }
  };
  return (
    <div className="flex justify-center gap-4 ">
      <button onClick={handleGoogleClick} type="button">
        <FcGoogle className="text-3xl hover:opacity-80 hover:scale-125 hover:-rotate-12 transition-all ease-out duration-200" />
      </button>
      <button onClick={handleAppleClick} type="button">
        <FaApple className="text-3xl hover:opacity-80 hover:scale-125 hover:-rotate-12 transition-all ease-out duration-200" />
      </button>
    </div>
  );
}
