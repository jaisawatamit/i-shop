// import React from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer className="bg-gray-800 text-white py-8">
//             <div className="container mx-auto px-4">
//                 <div className="flex flex-wrap justify-between">
//                     <div className="w-full md:w-1/4 mb-6 md:mb-0">
//                         <h2 className="text-xl font-bold mb-4">E-Shop</h2>
//                         <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at the best prices.</p>
//                     </div>
//                     <div className="w-full md:w-1/4 mb-6 md:mb-0">
//                         <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//                         <ul>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//                         </ul>
//                     </div>
//                     <div className="w-full md:w-1/4 mb-6 md:mb-0">
//                         <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
//                         <ul>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
//                             <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
//                         </ul>
//                     </div>
//                     <div className="w-full md:w-1/4">
//                         <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//                         <div className="flex space-x-4">
//                             <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
//                             <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
//                             <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
//                             <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-8 text-center text-gray-400">
//                     &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;




import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div>
    <footer className="bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 text-gray-700">
        {/* Logo and Description */}
        <div>
          <h2 className="text-1xl font-bold text-gray-600">iSHOP</h2>
          <p className="mt-3 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer.
          </p>
        </div>
        
        {/* Follow Us */}
        <div>
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <p className="text-sm mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
          </p>
          <div className="flex space-x-2 mt-3">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
        
        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg">Contact Us</h3>
          <p className="text-sm mt-2">iShop: address @building 124</p>
          <p className="text-sm">Call us now: 0123-456-789</p>
          <p className="text-sm">Email: support@whatever.com</p>
        </div>
      </div>
      
      {/* Footer Links */}
      <div className="max-w-5xl mx-auto mt-8 border-t pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm text-gray-600">
        {['Infomation', 'Service', 'Extras', 'My Account', 'Userful Links', 'Our Offers'].map((section) => (
          <div key={section}>
            <h4 className="font-semibold">{section}</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
            </ul>
          </div>
        ))}
      </div>
    </footer>
    </div>
    </>
   
  );
};

export default Footer;



