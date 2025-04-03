'use client'

import { axiosInstance } from "@/library/healper";
import { adminlogin } from "@/redux/slices/AdminSlice";
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
    setFormData({ ...formData, [name]: value }); // Update form data dynamically
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axiosInstance.post("/admin/login", formData)
        .then(
          (response) => {
            console.log(response);
            if (response.data.flag == 1) {
              console.log(response.data.flag); 
              dispatch(adminlogin({ admin: response.data.admin }))
              toast.success(response.data.message);
              localStorage.setItem("admin", JSON.stringify(response.data.admin));
              localStorage.setItem("admin_timestamp", new Date().getTime());
              router.push("/admin");
            } else {
              toast.error(response.data.message);
            }

          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          Admin Login 
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none ${errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "focus:ring-2 focus:ring-green-400"
                }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none ${errors.password
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "focus:ring-2 focus:ring-green-400"
                }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Message Section */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${message.includes("successful")
              ? "text-green-500"
              : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        {/* <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};








