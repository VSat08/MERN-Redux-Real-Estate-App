import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosAlert } from "react-icons/io";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload failed(2mb per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading  is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.type === "number") {
      setFormData({
        ...formData,
        [e.target.id]: +e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1) {
      return setError("you must upload atleast 1 image(max:6)");
    }

    if (formData.regularPrice < formData.discountPrice) {
      return setError("Discount price must be lower than regular price");
    }
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success == false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className="px-4 py-4 md:px-20 lg:px-28 mx-auto mt-28 ">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-1 mt-4 text-black font-bold"
      >
        <RiArrowGoBackFill />
        back
      </button>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center my-7 animate-fade-up animate-once animate-ease-out">
        Wanna Update
        <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold p md:my-2 block  ">
          your
        </span>
        <span className="text-5xl mr-32 md:text-6xl lg:text-7xl font-extrabold p-2 my-0.5 md:my-2 block bg-gradient-to-r from-yellow-400 via-orange-500  to bg-red-500   text-transparent bg-clip-text  ">
          Listing!
        </span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 relative "
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-2 md:p-3 text-sm"
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required
            onChange={handleChange}
            value={formData.description}
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-2 md:p-3 text-sm min-h-32"
          />
          <input
            type="text"
            id="address"
            placeholder="Adddress"
            required
            onChange={handleChange}
            value={formData.address}
            className="focus:outline-none rounded-xl  border-[2px] border-orange-500/50 p-2 md:p-3 text-sm"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-4 h-4 "
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-4 h-4 "
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-4 h-4 "
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="checkbox"
                id="furnished"
                className="w-4 h-4 "
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-4 h-4 "
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
              />
              <div>
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="p-1 rounded-lg outline-none border-[2px] border-orange-500/70"
                />
                <div>
                  <p>Discount price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 pb-10 sm:p-0">
          <p className="font-semibold text-xs">
            Images :
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover(max:6)
            </span>
          </p>
          <p className="text-red-600 font-medium h-2.5 text-xs ml-3 ">
            {imageUploadError && imageUploadError}
          </p>
          <div className="flex items-center gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="relative  w-full  flex-auto rounded-3xl border border-solid border-neutral-300 bg-clip-padding px-5 py-0.5 text-sm font-normal text-neutral-400 transition duration-300 ease-in-out shadow-2xl shadow-neutral-800/25 file:text-xs file:-mx-2 file:my-2 file:shadow-md file:shadow-orange-300/60 file:overflow-hidden file:rounded-xl file:border-0 file:border-solid file:border-inherit file:bg-gradient-to-r file:from-orange-500  file:to-yellow-500   file:px-3 file:py-[0.4rem] file:text-neutral-100 file:transition file:duration-150 file:ease-in-out  file:[margin-inline-end:0.75rem] hover:file:opacity-70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none cursor-pointer file:cursor-pointer file:hover:scale-105 file:hover:rounded-2xl  file:hover:shadow-orange-500/70 file:hover:shadow-xl    "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className=" bg-gradient-to-r from-gray-900 via-black to-gray-900 p-2.5 px-4 rounded-xl cursor-pointer font-medium border-none text-white shadow-xl shadow-black/20  text-sm md:text-base flex items-center gap-1 justify-center group-hover:gap-[7px] disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="flex gap-1 flex-wrap bg-neutral-100 rounded-2xl ">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 justify-center items-center p-1  backdrop-blur-md bg-white/10 rounded-2xl  my-1 mx-2 "
                >
                  <img
                    src={url}
                    alt="lisitng image"
                    className="h-24 w-24 object-contain rounded-lg shadow-lg shadow-gray/15  "
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="w-16 py-1 hover:opacity-70 hover:scale-110"
                  >
                    <AiTwotoneDelete className="text-red-600 text-lg mx-auto" />
                  </button>
                </div>
              ))}
          </div>
          {error && (
            <p className="text-red-500 font-medium text-sm flex gap-2 ml-2 items-center">
              <IoIosAlert className="text-red-500 filter drop-shadow-lg animate-bounce text-lg" />
              {error}
            </p>
          )}
          <button
            disabled={loading || uploading}
            className=" bg-gradient-to-r from-gray-900 via-black to-gray-900 p-2.5 px-4 rounded-xl cursor-pointer font-medium border-none text-white shadow-xl shadow-black/20  text-sm md:text-base flex items-center gap-1 justify-center  disabled:opacity-70 fixed bottom-2 inset-x-2 sm:relative sm:inset-0 "
          >
            <IoMdAddCircle />
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
