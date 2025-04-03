"use client";

import { motion } from "framer-motion"; // Animation library
import { useDispatch, useSelector } from "react-redux";
import { logout, lsToUser } from "@/redux/slices/UserSlice";
import { emptyCart, lsToCart } from "@/redux/slices/CartSlice";
import { FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from "next/link";
import { useEffect } from "react";

const MobileMenu = ({ onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(lsToUser());
        dispatch(lsToCart());
    }, [dispatch]);

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-[#555357e2] shadow-lg z-50 p-5 flex flex-col"
        >
            {/* Close Button */}
            <button className="self-end text-2xl" onClick={onClose}>
                <FaTimes />
            </button>

            <div className="mt-6 flex justify-between items-center gap-4">
                {user.data ? (
                    <> <Link href='/my-profile'>
                        <div className="flex items-center gap-2 text-black font-bold">

                            <FaUser />

                            <span>{user.data.name || "User"}</span>
                        </div>
                    </Link>
                        <button
                            onClick={() => {
                                dispatch(logout());
                                dispatch(emptyCart());
                                onClose();
                            }}
                            className="text-red-500 font-bold hover:text-red-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/account" className="flex items-center gap-2 text-black font-bold hover:text-gray-400" onClick={onClose}>
                        <RiAccountPinCircleFill />
                        Login
                    </Link>
                )}

                {/* Cart */}
                <Link href={"/checkout"} className="flex items-center gap-2 text-black font-bold hover:text-gray-400" onClick={onClose}>
                    <FaShoppingCart />
                    <span>Cart ({cart.items?.length || 0})</span>
                </Link>
            </div>
            {/* Navigation Links */}
            <nav className="mt-5 space-y-4 flex flex-col gap-2 items-center">
                <Link href={"/"} className="text-black font-bold hover:text-gray-400" onClick={onClose}>
                    Home
                </Link>
                <Link href={"/store"} className="text-black font-bold hover:text-gray-400" onClick={onClose}>
                    Store
                </Link>
                <Link href="/contact" className="text-black font-bold hover:text-gray-400" onClick={onClose}>
                    Contact
                </Link>
                <Link href="/about" className="text-black font-bold hover:text-gray-400" onClick={onClose}>
                    About
                </Link>
            </nav>

            {/* User & Cart Info */}

        </motion.div>
    );
};

export default MobileMenu;
