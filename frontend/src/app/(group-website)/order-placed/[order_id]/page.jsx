'use client'
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderPlaced = ({ params }) => {
    const order_id = params.order_id;
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
                <h1 className="text-2xl font-semibold mt-4 text-gray-800">Order Placed Successfully!</h1>
                <p className="text-gray-600 mt-2">Thank you for your purchase. Your order ID is:</p>
                <p className="text-lg font-medium text-gray-900 mt-1">{order_id}</p>
                <p className="text-sm text-gray-500 mt-2">You will receive a confirmation email soon.</p>
                <button 
                    className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={() => router.push("/")}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderPlaced;
