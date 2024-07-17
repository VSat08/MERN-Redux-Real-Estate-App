import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaTrash, FaUmbrellaBeach } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { GrEdit, GrList } from "react-icons/gr";
import { IoMdTrash } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";
import "ldrs/helix";

import Swal from "sweetalert2";

import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { Modal } from "../components/Modal";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingUserListing, setLoadingUserListing] = useState(false);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPerc(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        toast: "true",
        timerProgressBar: "true",
        title: "Persona updated !",
        showConfirmButton: false,
        timer: 3000,
        color: "#fff",
        padding: "10px",
        width: "18em",
        background: "#1a1a1a",
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        toast: "true",
        timerProgressBar: "true",
        title: "Account Deleted !!",
        showConfirmButton: false,
        timer: 3000,
        color: "#fff",
        padding: "10px",
        width: "18em",
        background: "#1a1a1a",
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      Swal.fire({
        position: "top",
        icon: "success",
        toast: "true",
        timerProgressBar: "true",
        title: data,
        showConfirmButton: false,
        timer: 3000,
        color: "#fff",
        padding: "5px",
        background: "#1a1a1a",
      });
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    setIsOpen(true);
    try {
      setShowListingsError(false);
      setLoadingUserListing(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        setLoadingUserListing(false);
        Swal.fire({
          position: "top",
          icon: "error",
          toast: "true",
          timerProgressBar: "true",
          title: data.message,
          showConfirmButton: false,
          timer: 3000,
          color: "red",
          padding: "5px",
          background: "#1a1a1a",
        });
        return;
      }

      setUserListings(data);
      setLoadingUserListing(false);
    } catch (error) {
      setShowListingsError(true);
      setLoadingUserListing(false);
      Swal.fire({
        position: "top",
        icon: "error",
        toast: "true",
        timerProgressBar: "true",
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
        color: "red",
        padding: "5px",
        background: "#1a1a1a",
      });
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="w-full px-8 mx-auto  md:max-w-6xl mt-28">
        <div className="absolute -top-10 -z-10 left-0 w-full">
          <img
            src="https://img.freepik.com/premium-vector/set-indian-men-women-avatars-smiling-male-female-cartoon-characters-collection-horizontal-portrait_48369-25012.jpg?w=1480"
            alt=""
            className="object-cover w-full h-80"
          />
        </div>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 mt-4 text-white font-bold"
        >
          <RiArrowGoBackFill />
          Home
        </button>
        <div className="md:p-4 flex w-full mx-auto  gap-1 flex-wrap justify-between">
          {/* left columns */}
          <div className="bg-white/75 md:bg-[rgba(255,255,255,.3)] backdrop-blur-sm w-full md:w-1/3  flex flex-col py-4 rounded-3xl  md:shadow-2xl lg:w-1/3 md:shadow-gray-300 ">
            <div className="relative rounded-full h-24 w-24 self-center mt-2 group">
              <div className="absolute inset-0 h-full w-full  z-10  rounded-full flex group overflow-hidden ">
                <HiOutlineUpload className="w-12 h-12 font- m-auto group-hover:text-white translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100  transition-all duration-200 ease-out " />
                <form>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </form>
              </div>
              <img
                className="rounded-full h-24 w-24 object-cover self-center group-hover:scale-105 transition-all duration-200 ease-out group-hover:rotate-6 group-hover:opacity-95 group-hover:blur-[2px] "
                src={formData.avatar || currentUser.avatar}
                alt="profile"
              />
            </div>

            <p className="self-center my-2">
              {uploadError ? (
                <span className="text-red-600 font-medium flex gap-1 items-center">
                  <RiErrorWarningFill />
                  Error Image Upload
                </span>
              ) : uploadPerc > 0 && uploadPerc < 100 ? (
                <span className="text-slate-700">Uploading {uploadPerc}%</span>
              ) : uploadPerc === 100 ? (
                <span className="text-green-600 font-medium flex gap-2 items-center">
                  Successfully Uploaded!
                  <FaRegThumbsUp className="text-lg" />
                </span>
              ) : (
                ""
              )}
            </p>

            <div className="self-center space-y-4">
              <h1 className="leading-snug text-3xl md:text-2xl lg:text-3xl font-extrabold my-2">
                Hola !
                <span className="text-sm lg:text-lg block font-semibold">
                  {currentUser.username} !
                </span>
              </h1>
            </div>

            <div className="mx-auto my-4 flex gap-5 items-center flex-wrap justify-center ">
              <Link
                to={"/create-listing"}
                className=" self-center text-center   hover:scale-105 transition-transform duration-300 ease-out group  w-auto md:w-44 lg:w-11/12"
              >
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-3 px-4 rounded-xl cursor-pointer font-medium border-none text-white  shadow-xl shadow-gray-400/60 w-auto md:w-44 lg:w-full text-xs sm:text-sm md:text-base flex items-center gap-1 justify-center  group-hover:gap-[7px] "
                >
                  <FaPencilAlt />
                  Create Listings
                </motion.button>
              </Link>

              <motion.button
                onClick={handleShowListings}
                whileTap={{ scale: 0.75 }}
                className="self-center text-center hover:scale-105 transition-transform duration-300 ease-out bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl shadow-orange-400/35 shadow-lg p-3 px-4 cursor-pointer font-medium border-none  w-auto md:w-44 lg:w-11/12 text-xs sm:text-sm md:text-base flex items-center gap-1 hover:gap-2  justify-center group-hover:gap-[7px]"
              >
                <GrList />
                Show Listings
              </motion.button>
            </div>
          </div>

          {/* right column */}
          <div className="w-full md:w-3/5 mx-auto md:max-w-md">
            <h1 className="leading-snug text-xl md:text-2xl lg:text-4xl  font-extrabold mt-2 md:mt-16 ">
              Let's
              <span className="text-3xl md:text-5xl lg:text-6xl block">
                Update Your Profile!
              </span>
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8 md:mt-10"
            >
              <input
                id="username"
                type="text"
                defaultValue={currentUser.username}
                onChange={handleChange}
                placeholder="username"
                className="border-2 border-gray-100 px-4 p-2 md:p-3 rounded-xl text-sm sm:text-base outline-none  text-gray-400 focus:text-black"
              />
              <input
                id="email"
                type="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                placeholder="email"
                className="border-2 border-gray-100 px-4 p-2 md:p-3 rounded-xl text-sm sm:text-base outline-none shadow-xl shadow-gray-200/50 text-gray-400 focus:text-black"
              />
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  onChange={handleChange}
                  className="border-2 border-gray-100 px-4 p-2 md:p-3 rounded-xl text-sm sm:text-base outline-none w-full"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BiShowAlt /> : <BiHide />}
                </button>
              </div>
              <button
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500  to-yellow-300  text-white p-3 rounded-xl shadow-orange-400/35  shadow-lg"
              >
                {loading ? (
                  "loading..."
                ) : (
                  <>
                    Update
                    <MdTipsAndUpdates className="text-xl" />
                  </>
                )}
              </button>
            </form>
            <div className=" flex justify-between mt-5">
              <span
                onClick={handleDeleteUser}
                className="cursor-pointer text-slate-500 font-medium text-sm flex items-center gap-1"
              >
                Delete Account <FaTrash />
              </span>
              <span
                onClick={handleSignOut}
                className="cursor-pointer text-red-600 font-medium text-sm flex items-center gap-1"
              >
                Sign out <FiLogOut />
              </span>
            </div>

            <p className="text-red-700 font-medium mt-4 h-4 text-center">
              {error && error}
            </p>
          </div>
        </div>
        {/* modal */}
        <AnimatePresence>
          {isOpen && (
            <Modal>
              <h2 className="flex gap-2 items-center justify-center text-xl md:text-2xl my-7">
                My Listings{" "}
                <FaUmbrellaBeach className="animate-bounce animate-infinite animate-duration-[3000ms] animate-ease-in-out" />
              </h2>
              <div className="overflow-y-auto max-h-60 space-y-2">
                {/* loading condition */}
                {loadingUserListing && (
                  <div className=" flex items-center justify-center  w-full">
                    <l-helix size="50" speed="5" color="orange"></l-helix>
                  </div>
                )}
                {/* listing display */}
                {userListings &&
                  !loadingUserListing &&
                  userListings.length > 0 &&
                  userListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="flex items-center justify-between border rounded-2xl p-2.5 gap-4"
                    >
                      <Link to={`/listing/${listing._id}`}>
                        <img
                          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
                          src={listing.imageUrls[0]}
                          alt="Listing cover"
                        />
                      </Link>
                      <Link
                        className="flex-1 truncate"
                        to={`/listing/${listing._id}`}
                      >
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 ">
                          {listing.name}
                        </p>
                      </Link>
                      <div className="space-x-4">
                        <button
                          onClick={() => handleListingDelete(listing._id)}
                          className="text-black/80 ring-2 rounded-full ring-red-400 p-1 hover:scale-110 hover:-translate-y-1 transition-all ease-in-out duration-200 animate-wiggle animate-infinite "
                        >
                          <IoMdTrash className="text-sm" />
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                          <button className="text-gray-600 ring-2 rounded-full ring-green-400 p-1 hover:scale-110 hover:-translate-y-1 transition-all ease-in-out duration-200 animate-wiggle animate-infinite">
                            <GrEdit className="text-sm" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}

                {!loadingUserListing && userListings.length === 0 && (
                  <p className="text-center font-semibold  text-sm">
                    No Listings right now : )
                    <br />
                    Why dont create one!
                  </p>
                )}
              </div>

              <button
                className="absolute right-8 top-2 animate-wiggle animate-infinite"
                onClick={() => setIsOpen(false)}
              >
                <TbArrowBackUp className="text-4xl text-slate-600" />
              </button>
            </Modal>
          )}
        </AnimatePresence>
      </div>
      {/* bottom nav */}
      <div className="my-[4.5rem] md:m-0">
        <BottomNav />
      </div>
    </>
  );
}
