// import Image from 'next/image';
// import iphone from "@/public/images/iphone_6_plus@2x.png";

// export default function Iphone6Section() {
//   return (
//     <section className="relative  bg-blue-500  px-6 flex flex-col lg:flex-row items-center justify-center gap-12 text-center lg:text-left text-white">
      
//       {/* Left Content */}
//       <div className="relative max-w-lg z-10">
//         <h1 className="text-[40px] font-bold">iPhone 6 Plus</h1>
//         <p className="mt-4 text-lg">Performance and design. Taken right to the edge.</p>
//         <button className="mt-6 px-6 py-3 text-white font-semibold hover:text-gray-200 border-b-4 border-white">
//           SHOP NOW
//         </button>
//       </div>
      
//       {/* Right Content - Floating Images */}
//       <div className="relative w-full max-w-xl lg:h-[400px] flex justify-center">        
//         {/* Second iPhone Image - Right */}
//         <Image
//           src={iphone}
//           alt="iPhone 6 Plus Back"
//           className="absolute bottom-[0] sm:bottom-0 right-10  drop-shadow-2xl"
//           width={400}
//         />
//       </div>
      
//     </section>
//   );
// }



import Image from 'next/image';
import iphone from "@/public/images/iphone_6_plus@2x.png";

export default function Iphone6Section() {
  return (
    <section className="relative bg-blue-500 px-11 lg:flex items-center justify-around text-white">
      
      {/* Left Content (Text) */}
      <div className="lg:w-1/2 max-w-lg  mx-[120px] text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold leading-tight">
          iPhone 6 Plus
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-[500px] mx-auto lg:mx-0">
          Performance and design. Taken right to the edge.
        </p>
        <button className="mt-6 md:mt-8 px-6 py-3 text-sm md:text-base text-white font-semibold hover:text-gray-200 border-b-4 border-white transition-colors duration-200">
          SHOP NOW
        </button>
      </div>
      
      {/* Right Content (Images) */}
      <div className=" w-full sm:h-[300px] lg:h-[500px]  flex justify-center items-center">
        {/* First iPhone Image */}
        <Image
          src={iphone}
          alt="iPhone 6 Plus"
          className="absolute w-[550px] bottom-0  "
          width={600}
          height={600}
        />
      </div>
    </section>
  );
}

