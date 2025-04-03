"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import MobileMenu from "./MobileManu";
 // Sidebar component

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <h1 className="text-[#FF4252] font-bold text-[30px] font-sans">
          iSHOP
        </h1>
        <FaBars 
          className="text-2xl cursor-pointer" 
          onClick={() => setIsMenuOpen(true)} 
        />
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default MobileHeader;
