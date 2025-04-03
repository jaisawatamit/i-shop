import Link from "next/link";

export default function Sub() {
  return (
    <div>
      <div>
        <h1 className="text-[#FF4252] text-center font-bold text-[50px] font-sans">
          iSHOP
        </h1>
      </div>
      <header className="bg-[#FFFFFF] p-4 relative ">
        <nav className="flex justify-center space-x-8 relative">
          <Link href={"/"} className="text-black font-bold hover:text-gray-400">
            Home
          </Link>

          {/* Store Dropdown */}
          <div className="relative group  ">
            <Link href={"/store"} className="text-black font-bold hover:text-gray-400">
              Store
            </Link>
            {/* Dropdown Menu */}
            <div className="absolute left-[-380px] z-10 top-full hidden group-hover:flex bg-white shadow-lg w-screen max-w-[1100px] p-6 border border-gray-200 rounded-md justify-center">
              <div className="grid grid-cols-3 gap-8 w-full max-w-[1000px]">
                <div>
                  <h3 className="text-gray-500 font-semibold">Accessories</h3>
                  <ul className="text-black">
                    <li>AirPort & Wireless</li>
                    <li>AppleCare</li>
                    <li>Bags, Shells & Sleeves</li>
                    <li>Business & Security</li>
                    <li>Cables & Docks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-gray-500 font-semibold">Category</h3>
                  <ul className="text-black">
                    <li>Cameras & Video</li>
                    <li>Car & Travel</li>
                    <li>Cases & Films</li>
                    <li>Charging Devices</li>
                    <li>Connected Home</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-gray-500 font-semibold">Category</h3>
                  <ul className="text-black">
                    <li>Headphones</li>
                    <li>HealthKit</li>
                    <li>Mice & Keyboards</li>
                    <li>Music Creation</li>
                    <li>Networking & Server</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <a href="#iphone" className="text-black font-bold hover:text-gray-400">
            iPhone
          </a>
          <a href="#ipad" className="text-black font-bold hover:text-gray-400">
            iPad
          </a>
          <a href="#macbook" className="text-black font-bold hover:text-gray-400">
            MacBook
          </a>
          <a href="#accessories" className="text-black font-bold hover:text-gray-400">
            Accessories
          </a>
        </nav>
      </header>
    </div>
  );
}
