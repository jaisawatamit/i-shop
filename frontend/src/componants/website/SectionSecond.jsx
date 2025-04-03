import Image from 'next/image';
import iphone from "@/public/images/iphone_6_plus@2x.png";
import headphone from "@/public/images/3_Corousel@2x.png";

export default function SectionSecond() {
    return (
      <>
        {/* Desktop Version (Hidden on mobile) */}
        <section 
          className="
            relative 
            hidden lg:flex
            [background:linear-gradient(67deg,#E71D3A_10%,#ECC7C1_45%,#EFCAC4_58%,#E4BDB8_70%,#42A8FE_100%)] 
            flex-col lg:flex-row 
            items-center 
            justify-end
            min-h-[300px] 
            md:min-h-[400px] 
            lg:min-h-[500px]
          "
        >
          <div className="relative w-full lg:w-1/2 h-full flex justify-center lg:justify-end">
            <Image
              src={iphone}
              alt="iPhone 6 Plus Back"
              className="w-[280px] md:w-[350px] lg:w-[400px] absolute bottom-[-250px] right-0 object-contain drop-shadow-2xl"
              width={600}
              height={600}
            />
          </div>
        </section>

        {/* Mobile Version (Hidden on desktop) */}
        <section className="lg:hidden bg-[#0C0C0C] min-h-[500px] flex items-end">
          <div className="relative w-full px-4">
            <Image
              src={headphone}
              alt="3_Corousel"
              className="w-[370px] sm:w-[350px] mx-auto object-contain drop-shadow-2xl"
              width={500}
              height={500}
            />
          </div>
        </section>
      </>
    );
}