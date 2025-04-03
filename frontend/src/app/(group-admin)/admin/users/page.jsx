"use client"
import { getUsers } from "@/library/api-colls";
import React, { useEffect, useState } from "react";
// Import the getUsers function

const UsersPage =  () => {

    // const users = await getUsers(); // Fetch users on component mount
    const [users, setUsers] = useState([]); // State to store user data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to handle errors
    const [visiblePasswords, setVisiblePasswords] = useState({}); // Track password visibility for each user
    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            console.log("Fetched users:", data); // Log the fetched data
            setUsers(data);
        } catch (err) {
            setError(err.message || "An error occurred while fetching users");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
     // Toggle password visibility for a specific user
     const togglePasswordVisibility = (userId) => {
        setVisiblePasswords((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId], // Toggle visibility for the specific user
        }));
    };


    return (
        <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="text-center">
                                <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    User Id
                                </th>
                                <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Email
                                </th>
                                {/* <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Address
                                </th> */}
                                <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Password
                                </th>
                                <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className="text-center bg-white border-b hover:bg-gray-200">
                                        <td className="px-5 py-5 text-sm">{index + 1}</td>
                                        <td className="px-5 py-5 text-sm">{user._id}</td>
                                        <td className="px-5 py-5 text-sm">{user.name}</td>
                                        <td className="px-5 py-5 text-sm">{user.email}</td>
                                        {/* <td className="px-5 py-5 text-sm">{user.address}</td> */}
                                        <td className="px-5 py-5 text-sm flex items-center justify-center">
                                            {/* Display shortened password or full password */}
                                            {visiblePasswords[user._id] ? user.password : "**********"}
                                            {/* Eye button to toggle password visibility */}
                                            <button
                                                className="ml-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                                                onClick={() => togglePasswordVisibility(user._id)}
                                            >
                                                {visiblePasswords[user._id] ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.519 3.519m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-5 py-5 text-sm">{user.phone || "N/A"}</td>
                                        <td className="px-5 py-5 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-white">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;