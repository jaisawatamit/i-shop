import React from 'react';
import { FaFilter, FaProductHunt } from 'react-icons/fa';

export default function ShopPage(){
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
            <div className="container mx-auto flex">
                {/* Left Section - Filters */}
                <div className="w-1/3 p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <FaFilter className="mr-2" /> Filters
                    </h2>
                    {/* Add your filter components here */}
                </div>
                
                {/* Right Section - Product Listing */}
                <div className="w-2/3 p-4 bg-white rounded-lg shadow-lg ml-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <FaProductHunt className="mr-2" /> Products
                    </h2>
                    {/* Add your product listing components here */}
                </div>
            </div>
        </div>
    );
};