'use client'

import { axiosInstance } from "@/library/healper";
import { dbToCart } from "@/redux/slices/CartSlice";
import { login } from "@/redux/slices/UserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function AccountPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axiosInstance.post("/user/login", formData)
        .then(
          (response) => {
            console.log(response);
            if (response.data.flag == 1) {
              const cart = response.data.user.cart;
              if (cart.length > 0) {
                let final_total = 0;
                let original_total = 0;
                const cartData = cart.map((c) => {
                  if (c.product_id) {
                    final_total += c.product_id.discounted_price * c.quantity;
                    original_total += c.product_id.original_price * c.quantity;
                    return {
                      product_id: c.product_id._id,
                      color_id: c.color_id,
                      quantity: c.quantity
                    };
                  } else {
                    return null;
                  }
                }).filter(item => item !== null);
                dispatch(dbToCart({ items: cartData, final_total, original_total }));
              }
              
              dispatch(login({ user: response.data.user }));
              toast.success(response.data.message);
              router.push("/");
              localStorage.setItem("user", JSON.stringify(response.data.user));
              localStorage.setItem("user_timestamp", new Date().getTime());
            } else {
              toast.error(response.data.message);
            }
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl p-7 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4 sm:mb-6">
          Please login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            Login
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account? <Link href="/register" className="text-blue-500 hover:text-blue-700 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
