'use client';

import { useState, useEffect } from "react";
import { getProducts } from "@/library/api-colls";
import CartBtn from "./CartBtn";

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepSize, setStepSize] = useState(3);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        console.log(response, "slider");
        
        setProducts(response.Products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Responsive adjustments
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) {
        setStepSize(1);
        setSliderWidth(width * 0.9);
      } else if (width < 768) {
        setStepSize(1);
        setSliderWidth(width * 0.8);
      } else if (width < 1024) {
        setStepSize(2);
        setSliderWidth(width * 0.9);
      } else {
        setStepSize(3);
        setSliderWidth(width * 0.85);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + stepSize >= products.length ? 0 : prev + stepSize));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? products.length - stepSize : prev - stepSize));
  };

  return (
    <section className="px-4 py-8 md:py-12 relative max-w-5xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-10">
        FEATURED PRODUCTS
      </h2>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / stepSize)}%)` }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 p-2"
              style={{ width: `${100 / stepSize}%` }}
            >
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border border-gray-200">
                <img
                  src={`http://localhost:5000/images/product/${product?.main_image}`}
                  alt={product?.name}
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto object-contain rounded-lg"
                />
                <h3 className="text-sm md:text-base font-semibold mt-2 md:mt-4 text-gray-700 text-center">
                  {product?.name}
                </h3>
                <div className="text-yellow-500 text-sm md:text-lg my-2">⭐⭐⭐⭐⭐</div>
                <div className="flex items-center justify-center space-x-2 md:space-x-3">
                  <p className="text-red-500 text-base md:text-lg font-bold">
                    ${product?.discounted_price}
                  </p>
                  <p className="text-gray-400 line-through text-xs md:text-sm">
                    ${product?.original_price}
                  </p>
                </div>

                <div className="mt-2 md:mt-4 w-full px-2">
                  <CartBtn
                    prices={{
                      original_price: product.original_price,
                      discounted_price: product.discounted_price,
                    }}
                    product_id={product._id}
                    colors={product.colors}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-gray-800 p-2 md:p-3 rounded-full shadow-lg  transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2  text-white bg-gray-800 p-2 md:p-3 rounded-full shadow-lg  transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}