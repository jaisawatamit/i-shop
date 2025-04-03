"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaBars, FaFilter } from "react-icons/fa";
// import PriceRangeSlider from "./PriceRangeSlider";
// import ColorOption from "./ColorOption";

const Shorting = ({ products, colors }) => {
  // State to track selected values
  const [sortOrder, setSortOrder] = useState();
  const [productView, setProductView] = useState("grid");
  const [openFilter, setOpenFilter] = useState(false);
  const [limit, setLimit] = useState(3);
  const pathName = usePathname();
  const routes = useRouter();
  const searchParams = useSearchParams();

  // Handle change for sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // log the selected sort option
  };

  useEffect(() => {
    const viewVal = searchParams.get("view");
    if (viewVal) {
      setProductView(viewVal);
    }
  }, [searchParams]);

  const productViewHandler = (view_value) => {
    setProductView(view_value);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("view", view_value);
    routes.push(currentUrl.toString());
  };

  const limitHandler = (e) => {
    const value = Number(e.target.value);
    setLimit(value);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("limit", value);
    routes.push(currentUrl.toString());
  };

  const searchHandler = (e) => {
    const url = new URL(window.location.href);
    if(e.key == "Enter"){
      if(e.target.value.trim() != 0){
        url.searchParams.set("search",e.target.value.trim())
      }
    }
    if(e.target.value.trim() == 0){
      url.searchParams.delete("search")
    }
    routes.push(url.toString())
  }

  useEffect(() => {
    const value = searchParams.get("limit");
    if (limit) {
      setLimit(Number(value));
    }
  }, [searchParams]);

  useEffect(() => {
    if (sortOrder != null) {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;
      searchParams.set("sort_by_name", sortOrder.toString());
      routes.push(`${pathName}?${searchParams.toString()}`);
    }
  }, [sortOrder]);

  return (
    <div className="w-full bg-[#F6F7F8] text-[14px] p-4 mt-0 sm: flex justify-between  items-center relative">
      <div className="flex items-center justify-between gap-10 ">
        <span className="hidden sm:block">{products?.length ?? 0} items</span>
        <div className="flex px-3 items-center gap-1 text-sm whitespace-nowrap">
        <span>Sort By</span>
          <select
            className="p-1 min-w-[100px] text-[14px] outline-none"
            name="sort_by"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="acending">Name :</option>
            <option value="acending">Acending</option>
            <option value="decending">Decending</option>
          </select>
        </div>
        <div className="hidden sm:flex gap-2 items-center">
          <label htmlFor="show">Show</label>
          <select
            onChange={limitHandler}
            value={limit}
            name="sort_by_limit"
            className="p-1 min-w-[100px] text-[14px] outline-none focus:outline-none"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
          </select>
        </div>
        <div className="max-w-xl mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onKeyUp={searchHandler}
              onInput={searchHandler}
              className="block w-full p-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
             focus:outline-none
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
             dark:focus:ring-0 dark:focus:border-blue-500"
              placeholder="Search item..."
              required=""
            />
          </div>
        </div>

        <div
          onClick={() => setOpenFilter(!openFilter)}
          className={` lg:hidden sm:text-[14px]  flex items-center cursor-pointer gap-1 `}
        >
          <FaFilter />
          <span>Filter</span>
        </div>
        <div
          className={`w-full fixed left-0 bottom-0 p-3 px-4 bg-[#F6F7F8] z-50 transition-all duration-300 ease-in-out ${
            openFilter
              ? "translate-y-0 max-h-[300px]"
              : "translate-y-full max-h-0"
          } overflow-hidden`}
        >
          <h2>Colors</h2>
          {/* <ColorOption colors={colors} /> */}
          <h2>Price</h2>
          {/* <PriceRangeSlider /> */}
        </div>
      </div>
      <div className="-order-1 sm:order-1 text-[20px] flex justify-center gap-3 items-center">
          <BsGrid3X3GapFill
            onClick={() => productViewHandler("grid")}
            className={`text-[#C1C8CE] hover:text-[#4f5357] cursor-pointer ${
              productView === "grid" && "!text-[#2678BF]"
            }`}
          />
          <FaBars
            onClick={() => productViewHandler("list")}
            className={`text-[#C1C8CE] hover:text-[#4f5357] cursor-pointer ${
              productView === "list" && "!text-[#2678BF]"
            }`}
          />
        </div>
    </div>
  );
};

export default Shorting;