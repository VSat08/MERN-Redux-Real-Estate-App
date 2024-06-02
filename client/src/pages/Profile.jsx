import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaRegThumbsUp } from "react-icons/fa";
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
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  // console.log(formData)
  // console.log(formData);

  // console.log(file);
  // console.log(uploadPerc);

  // firebase storage
  //  allow read;
  //     allow write:if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

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
    // console.log(formData);

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
  return (
    <div className="w-full px-8 mx-auto  md:max-w-3xl lg:max-w-6xl">
      <div className="absolute -top-14 -z-10 left-0 w-full">
        <img
          src="https://img.freepik.com/premium-vector/set-indian-men-women-avatars-smiling-male-female-cartoon-characters-collection-horizontal-portrait_48369-25012.jpg?w=1480"
          alt=""
          className="object-cover w-full h-80"
        />
      </div>
      <div className="flex items-center gap-1  mt-4 text-white font-bold">
        <RiArrowGoBackFill />
        Home
      </div>
      <div className="p-4 flex w-full mx-auto  gap-1 flex-wrap ">
        {/* left columns */}
        <div className="bg-[#ebebeb] md:bg-[rgba(255,255,255,.3)] md:backdrop-blur-sm w-full md:w-1/3  flex flex-col py-4 rounded-3xl  md:shadow-2xl md:shadow-gray-300">
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
            <h1 className="leading-snug text-2xl md:text-xl lg:text-2xl font-extrabold my-2">
              Hi there!
              <span className="text-4xl md:text-2xl lg:text-4xl block">
                {currentUser.username}
              </span>
            </h1>
            <p className="font-medium text-sm">{currentUser.email}</p>
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
              className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-inner  shadow-gray-300 text-gray-400 focus:text-black"
            />
            <input
              id="email"
              type="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              placeholder="email"
              className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-lg shadow-gray-200 text-gray-400 focus:text-black"
            />
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={handleChange}
                className="border px-4 p-2 md:p-3 rounded-2xl outline-none shadow-inner shadow-gray-300 w-full"
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
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500  to-yellow-300  text-white p-3 rounded-xl shadow-lg"
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
            <span className="cursor-pointer  font-medium text-sm flex items-center gap-1">
              Delete Account <FaTrash />
            </span>
            <span className="cursor-pointer text-red-600 font-medium text-sm flex items-center gap-1">
              Sig out <FiLogOut />
            </span>
          </div>
          <p className="text-red-700 font-medium mt-4 h-4 text-center">
            {error && error}
          </p>
        </div>
      </div>
    </div>
  );
}
