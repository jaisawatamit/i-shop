import Image from "next/image";
import iphone8 from "@/public/images/iphone_8@2x.png";

export default function Iphone8Section() {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 to-purple-600 min-h-[500px] lg:min-h-[400px] sm:min-h-[500px] py-12 overflow-hidden">
      {/* Text Content */}
      <div className="container  mx-auto px-6 ">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-xl">
          <h1 className="text-4xl sm:text-2xl lg:text-6xl xl:text-[62px] font-bold mb-4">
            iPhone 6 Plus
          </h1>
          <p className="text-[20px] sm:text-2xl lg:text-[35px] mb-8 lg:mb-5">
            Performance and design.Taken right to the edge.
          </p>
          <button className="text-sm sm:text-base lg:text-lg bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>

      {/* Device Image (Responsive) */}
      <div className="absolute bottom-0 left-1/2 mt-10 transform translate-y-[125px] translate-x-[-100px] lg:left-auto lg:right-0 lg:transform-none h-full w-full max-w-[70%] sm:max-w-[85%] md:max-w-[90%] lg:max-w-4xl">
        <Image
          src={iphone8}
          alt="iPhone 8"
          fill
          className="object-contain object-center lg:object-right animate-float"
          sizes="(max-width: 768px) 80vw, 60vw"
        />
      </div>
    </section>
  );
}