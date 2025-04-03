'use client'

import { emptyCart, lsToCart } from '@/redux/slices/CartSlice';
import { logout, lsToUser } from '@/redux/slices/UserSlice';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { FaCartPlus, FaSearch, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '@/library/api-colls';

export const Header = () => {
    // const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const user = useSelector(store => store.user);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();

    // const featchData = async () => {
    //     const product_data = await getProducts();
    //     setProducts(product_data);
    // }

    // useEffect(() => { featchData(); }, [])
    useEffect(() => { dispatch(lsToUser()); dispatch(lsToCart()); }, [])
    // useEffect(() => { document.body.style.overflow = showCart ? "hidden" : ""; }, [showCart])

    return (
        <>
           
            <header className="bg-white flex flex-col md:flex-row justify-between items-center p-2 sm:p-3 lg:p-4 sticky top-0 w-full z-[999] shadow-md">
            {/* <CartSideBar products={products} cart={cart}  /> */}
                {/* Mobile Top Row */}
                <div className="w-full md:w-auto flex justify-between items-center mb-2 md:mb-0">
                    <div className="text-[#FF4252]  text-xl sm:text-2xl lg:text-4xl font-bold">iSHOP</div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href={"/checkout"} className="flex items-center">
                            <FaShoppingCart className="text-2xl" />
                            <span className="ml-1">({cart.items?.length})</span>
                        </Link>
                        {user.data != null ? (
                            <button onClick={() => { dispatch(logout()); dispatch(emptyCart()); }}>
                                <RiAccountPinCircleFill className="text-2xl" />
                            </button>
                        ) : (
                            <Link href="/account">
                                <RiAccountPinCircleFill className="text-2xl" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:max-w-[500px] lg:w-[500px] mb-2 md:mb-0">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-black pl-10 py-2"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-4 lg:gap-6 text-base lg:text-[20px] text-black font-bold">
                        <Link href='/my-profile' className="hidden sm:block hover:text-pink-400">
                            {user.data != null && (<div className='flex justify-center items-center gap-2'>
                                <FaUser />
                                <span> {(user.data.name || "user")}</span>
                            </div>)}
                        </Link>

                        
                            <Link href={"/checkout"} className="flex items-center gap-2 hover:text-pink-400">
                                <FaShoppingCart />
                                <span>item ({cart.items?.length})</span>
                            </Link>
                        

                        {user.data != null ? (
                            <button onClick={() => { dispatch(logout()); dispatch(emptyCart()); }} className="hover:text-pink-400">
                                Logout
                            </button>
                        ) : (
                            <Link href="/account" className="hover:text-pink-400 flex items-center gap-2">
                                <RiAccountPinCircleFill className="hidden lg:inline" />
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            </header>
        </>
    );
}