import { FaChartBar, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';

export default function HomePage() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">E-commerce Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                    <FaChartBar className="text-blue-500 text-3xl mr-4" />
                    <div>
                        <p className="text-gray-600">Total Sales</p>
                        <p className="text-2xl font-bold">$25,000</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                    <FaShoppingCart className="text-green-500 text-3xl mr-4" />
                    <div>
                        <p className="text-gray-600">Orders</p>
                        <p className="text-2xl font-bold">1,200</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                    <FaUsers className="text-yellow-500 text-3xl mr-4" />
                    <div>
                        <p className="text-gray-600">Customers</p>
                        <p className="text-2xl font-bold">3,400</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                    <FaDollarSign className="text-red-500 text-3xl mr-4" />
                    <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="text-2xl font-bold">$50,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Make sure to install the necessary packages:
// npm install tailwindcss react-icons
