import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStarts,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStarts());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className="py-4 px-12 md:px-16 max-w-lg mx-auto">
      <h1
        className="
        leading-snug
      text-3xl
    
      font-extrabold 
      my-12
      "
      >
        Hi there!
        <span
          className="text-6xl
        block"
        >
          let's Log in!
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="Email"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={loading}
          className="bg-gradient-to-r from-orange-500  to-yellow-300  text-white p-3 rounded-xl shadow-lg  disabled:opacity-20"
        >
          {loading ? "loading" : "Login"}
        </button>
        <OAuth />
      </form>
      <div className="mt-4">
        <p className=" text-center font-medium ">
          Hey! New Face Ah?
          <Link
            to="/sign-up"
            className=" mx-2 bg-gradient-to-r from-orange-500  via-yellow-500 to bg-red-500  text-transparent bg-clip-text"
          >
            Lets Signup !
          </Link>
        </p>
      </div>
    </div>
  );
}
