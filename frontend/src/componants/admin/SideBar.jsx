'use client'
import { lsToAdmin } from '@/redux/slices/AdminSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaHome, FaUserAlt, FaBox, FaChartLine, FaCog, FaLayerGroup, FaUserShield } from 'react-icons/fa';
import { MdFormatColorFill } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';


const SideBar = () => {

    const admin = useSelector(state => state.admin);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(lsToAdmin());
        }, []
    )
    useEffect(
        () => {
            if (admin?.data == null && localStorage.getItem("admin") == null) {
                router.push("/admin/login")
            }
        }, [admin.data]
    )
    const menuItems = [
        { name: "Dasboard", icon: <FaCog />, path: '/admin', featureType: 2 },
        { name: "Users", icon: <FaHome />, path: '/admin/users', featureType: 1 },
        { name: "Admins", icon: <FaUserShield />, path: '/admin/admin-listing', featureType: 1 },
        { name: "Categories", icon: <FaLayerGroup />, path: '/admin/category', featureType: 3 },
        { name: "Colors", icon: <MdFormatColorFill />, path: '/admin/color', featureType: 3 },
        { name: "Products", icon: <FaUserAlt />, path: '/admin/product', featureType: 3 },
        { name: "Reports", icon: <FaBox />, path: '/admin/reports', featureType: 1 },
        { name: "Settings", icon: <FaChartLine />, path: '/admin/setting', featureType: 2 },
        { name: "Transaction", icon: <FaChartLine />, path: '/admin/transaction', featureType: 1 },
        { name: "Order", icon: <FaChartLine />, path: '/admin/order', featureType: 1 },
    ];

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex-1">
                {menuItems.map((item, index) => {
                    if(admin?.data?.type == 2 && item.featureType == 1)return;
                    if(admin?.data?.type == 3 && item.featureType != 3)return;
                    
                    return(
                        <Link href={item.path} key={index} className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                            <div className="mr-4">{item.icon}</div>
                            <div>{item.name}</div>
                        </Link>
                    )
                }
                )}
            </div>
        </div>
    );
};


export default SideBar;




