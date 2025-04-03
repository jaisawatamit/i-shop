"use client"
import Link from "next/link";
import CartBtn from "./CartBtn";
import { useSearchParams } from "next/navigation";

const ProductCard = ({
  _id,
  name,
  colors,
  original_price,
  main_image,
  discounted_price,
  discount_percent,
  showDiscount,
}) => {
const searchParams = useSearchParams();
const view = searchParams.get("view") || "grid";
  // console.log("Search Params:", searchParams.view);
  // console.log("Current View:", view);
  return (
    <div
      className={`p-3 bg-white rounded-lg shadow-lg transform transition hover:shadow-xl hover:scale-105 duration-300 ${
        view === "grid"
          ? "flex flex-col items-center justify-center"
          : "flex justify-between items-center gap-4"
      }`}
    >
      {/* Product Image Section */}
      <Link href={`/details/${_id}`}>
        <div
          className={`relative ${
            view === "grid"
              ? "w-full h-60 flex justify-center items-center"
              : "w-32 flex-shrink-0"
          }`}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${main_image}`}
            alt={name}
            className={`object-cover ${
              view === "grid" ? "h-32 w-auto max-w-[80%]" : "h-full w-full rounded-lg"
            }`}
          />
          {showDiscount && discount_percent && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {discount_percent}% OFF
            </div>
          )}
        </div>
      </Link>

      {/* Product Info Section */}
      <div
        className={`${
          view === "list"
            ? "flex justify-between items-center flex-grow"
            : "text-center "
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h2>
        <div className="flex items-center gap-1 mb-2 text-yellow-500">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span className="text-gray-300">★</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="text-red-500">${discounted_price}</span>
          <span className="text-gray-500 line-through text-sm">${original_price}</span>
        </div>
        <div className="mt-4">
          <CartBtn
            prices={{ original_price, discounted_price }}
            product_id={_id}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;