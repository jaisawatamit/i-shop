'use client'
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { adminlogout } from '@/redux/slices/AdminSlice';

const Header = () => {

    const admin = useSelector(state => state.admin);
    const dispatch = useDispatch();
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            <div className="text-2xl font-bold flex justify-between items-center">
                <FaUserCircle className="text-3xl mr-2" />

                Hii {admin?.data?.name}
            </div>
           
                <button
                onClick={() => dispatch(adminlogout())}
                    type="button"
                    className=" flex justify-between items-center gap-[5px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg   text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                 <BiLogOutCircle className='rotate-90'/>   Log Out
                </button>
           
        </header>
    );
};

export default Header;