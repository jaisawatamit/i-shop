'use client';

import { axiosInstance } from "@/library/healper";
import { addToCart } from "@/redux/slices/CartSlice";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CartBtn({ prices, product_id, colors }) {
  const [colorId, setColorId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const carthandler = () => {
    if (user?.data == null) return alert("login please to add to cart")
    if (colorId == null) {
      alert("Please select a color");
    } else {
      axiosInstance.post("/user/add-cart", { user_id: user.data._id, product_id, color_id: colorId })
      .then(
        (response)=>{
          console.log("Response:", response.data); 
          dispatch(addToCart({ prices, product_id, color_id: colorId }));
          toast.success("Product Added")
        }
      ).catch(
        (error)=>{
          // toast.error(response.data.message) 
          console.log(error);
           
        }
      )
    }

  }
  return (
    <div className="my-3 flex flex-col justify-center items-center ">
      <button onClick={carthandler} className=" p-1 border text-2xl">
        <FaCartPlus />
      </button>
      <div className="my-4 flex  items-center gap-2">
        {
          colors.map((c) => (
            <div
              onClick={() => setColorId(c._id)}
              key={c._id}
              className={`cursor-pointer w-6 h-6 outline-none ${colorId == c._id && "outline-blue-500"} rounded-full border border-gray-300 inline-block`}
              style={{ backgroundColor: c.code }}
            >
            </div>
          ))
        }
      </div>
    </div>
  );
}
