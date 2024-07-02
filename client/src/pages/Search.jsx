import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  // console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className=" p-4 flex flex-col md:flex-row gap-6  max-w-7xl mx-auto">
      {/* left */}
      <div className=" p-4 md:p-7 bg-gradient-to-br from-white/40 to-slate-50/20  rounded-3xl shadow-2xl shadow-black/10  ">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 ${formOpen ? "" : "h-14"} ${
            !formOpen && "overflow-hidden"
          }  md:h-auto md:overflow-visible transition-height duration-700 ease-in-out `}
        >
          <input
            type="text"
            id="searchTerm"
            value={sidebarData.searchTerm}
            onChange={handleChange}
            placeholder="Search listings here..."
            className=" border-t-slate-400/20 rounded-xl px-4 py-2 w-full bg-white/20 backdrop-blur-md border border-white/20  p-2 outline-none shadow-md"
          />
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
                className="w-4 "
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
                className="w-4 "
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
                className="w-4 "
              />
              <span> Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={sidebarData.offer}
                onChange={handleChange}
                className="w-4 "
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities: </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={sidebarData.parking}
                onChange={handleChange}
                className="w-4 "
              />
              <span> Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebarData.furnished}
                onChange={handleChange}
                className="w-4 "
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort: </label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-2 outline-none shadow-xl"
            >
              <option
                value="regularPrice_desc"
                className="bg-white/20 backdrop-blur-md"
              >
                Price high to low
              </option>
              <option
                value="regularPrice_asc"
                className="bg-white/20 backdrop-blur-md"
              >
                Price low to high
              </option>
              <option
                value="createdAt_desc"
                className="bg-white/20 backdrop-blur-md"
              >
                Latest
              </option>
              <option
                value="createdAt_asc"
                className="bg-white/20 backdrop-blur-md"
              >
                Oldest
              </option>
            </select>
          </div>
          <button className="  hover:opacity-70 transition-transform duration-200 ease-out bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl shadow-orange-400/35 shadow-lg p-2 cursor-pointer font-medium border-none">
            Search
          </button>
        </form>

        <div className="  md:hidden space-y-0 my-1">
          <p className="text-center font-semibold text-sm text-slate-600">
            more filters
          </p>
          <button className=" w-full " onClick={() => setFormOpen(!formOpen)}>
            <IoIosArrowDown
              className={`transition-all duration-500 ease-in-out mx-auto text-orange-600 text-2xl ${
                formOpen && "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/* right */}
      <div className="">
        <h1 className="text-4-xl font-extrabold text-slate-800 text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
          Listing Results
        </h1>
      </div>
    </div>
  );
}
