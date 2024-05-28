import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <div className="py-4 px-12 md:px-16 max-w-lg mx-auto">
      <h1
        className="
        leading-snug
      text-4xl
    
      font-extrabold 
      my-12
      "
      >
        Yohoo!
        <span
          className="text-6xl
        block"
        >
          Sign Up!
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          id="username"
          placeholder="Username"
          className="focus:outline-none rounded-xl border border-1 p-3"
        />
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
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-3 disabled:opacity-20"
        >
          {loading ? "loading" : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="mt-4">
        <p className=" text-center font-medium">
          Hmm, Already a User?
          <Link
            to="/sign-in"
            className=" mx-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500  text-transparent bg-clip-text"
          >
            Login in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
