'use client'


import { axiosInstance } from '@/library/healper';
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdPhoneEnabled } from "react-icons/md";


// import { register } from '@/redux/slices/UserSlice';


const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' })
    // const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post("/user/register", formData)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.message);
                        router.push("/account");
                        //   localStorage.setItem("user", JSON.stringify(response.data.user));
                    } else {
                        toast.error(response.data.message);
                    }
                }
            ).catch((error) => {
                toast.error(error.response?.data?.message || "Something went wrong");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Join Us
                    </h2>
                    <p className="text-gray-600">Create your free account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                                id="name"
                                name="name"
                                type="text"
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                            <svg className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                placeholder="hello@example.com"
                            />
                            <svg className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Contact
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                                id="phone"
                                name="phone"
                                type="tel"
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <MdPhoneEnabled className="absolute right-3 top-4 text-gray-400"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                onChange={handleChange}
                                placeholder="••••••••"
                            />

                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-4 ">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle icon */}
                            </button>
                        </div>
                    </div>


                    <button

                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                        type="submit"
                    >
                        Create Account
                    </button>

                    <div className="flex items-center justify-center space-x-2 my-6">
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="text-gray-500 font-medium">or continue with</span>
                        <span className="h-px w-16 bg-gray-300"></span>
                    </div>

                    <div className="flex space-x-4 justify-center">
                        <button className="p-2.5 flex items-center justify-center rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition duration-300 shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                        </button>
                        <button className="p-2.5 flex items-center justify-center rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition duration-300 shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link href={"/account"} className="text-blue-600 hover:text-blue-800 font-semibold">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;