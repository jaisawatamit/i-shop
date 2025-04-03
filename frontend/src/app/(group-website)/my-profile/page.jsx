'use client'

import { axiosInstance } from '@/library/healper';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserData } from "@/redux/slices/UserSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

import Link from "next/link"

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState("details");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const user = useSelector(store => store.user);
    const [address_popup, setAddressPopup] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
    // const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        if (user?.data == null) {
            router.push("/account");
        }
    }, [user.data]
    )


    // useEffect(() => {
    //     if (user?.data === null && localStorage.getItem("user")) {
    //         dispatch(updateUserData({ user: JSON.parse(localStorage.getItem("user")) }));
    //     } else if (user?.data === null) {
    //         router.push("/account");
    //     }
    // }, [user.data, dispatch]);

    const addressSaveHandler = (data) => {
        axiosInstance.post(`/user/add-address/${user.data?._id}`, data)
            .then((response) => {
                if (response.data.flag === 1) {
                    dispatch(updateUserData({ user: response.data.updatedUser }));
                }
            }).catch((err) => {
                console.error(err);
            });
    }

    const deleteAddressHandler = (index) => {
        axiosInstance.patch(`/user/delete-address/${user.data?._id}`, { index: index })
            .then((response) => {
                if (response.data.flag === 1) {
                    dispatch(updateUserData({ user: response.data.user }));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    toast.success("Address deleted successfully");
                }
            })
            .catch((err) => {
                toast.error("Failed to delete address");
            });
    };


    const editAddressHandler = (formData) => {
        axiosInstance.put(`/user/edit-address/${user.data?._id}`, {
            index: formData.index,
            address: formData
        })
            .then((response) => {
                if (response.data.flag === 1) {
                    dispatch(updateUserData({ user: response.data.user }));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    toast.success("Address edited successfully");
                }
            })
            .catch((error) => {
                toast.error("Failed to edit address");
            }); 
    };


    const changePasswordHandler = (e) => {
        e.preventDefault();
        const old_password = e.target['old-password'].value;
        const new_password = e.target['new-password'].value;
        const conform_password = e.target['conform-password'].value;
        // console.log(old_password, new_password, conform_password);
        // return;  
        if (new_password !== conform_password) {
            toast.error("Passwords do not match");
            return;
        }
        axiosInstance.post(`/user/change-password/${user.data?._id}`, { old_password, new_password })
            .then(
                (response) => {
                    if (response.data.flag === 1) {
                        toast.success("Password changed successfully");
                        e.target.reset();
                    } else {
                        toast.error(response.data.message);
                    }
                }
            ).catch((err) => {
                toast.error("Failed to change password");
            })
    }

    const featchMyOrders = async () => {
        const responce = await axiosInstance.get(`/order/${user?.data._id}`)
        setOrders(responce.data.orders)
    }


    // useEffect(
    //     () => {
    //         featchMyOrders()
    //     }, []
    // )

    const orderStatus = {
        0: 'pending',
        1: 'order placed'
    }

    const changeDetailshandler = (e) => {
        const updatedData = {
            name: e.target["name"].value,
            email: e.target["email"].value,
            phone: e.target["phone"].value,
        };
        axiosInstance.put(`/user/change-details/${user.data?._id}`, updatedData)
            .then(
                (response) => {
                    if (response.data.flag === 1) {
                        dispatch(updateUserData({ user: response.data.user }));
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                        toast.success("Details changed successfully");
                    } else {
                        toast.error(response.data.message);
                    }
                }
            ).catch((error) => {
                console.log(error.message);
                toast.error(response.data.message);
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
             <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl border border-white/20">
                <div className="border-b border-gray-200/30">
                <nav className="flex justify-around">
                <button
                    className={`py-4 px-6 block font-medium transition-all ${
                        activeTab === 'details' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-500' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveTab('details')}
                >
                    My Details
                </button>
                <button
                    className={`py-4 px-6 block font-medium transition-all ${
                        activeTab === 'addresses' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-500' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveTab('addresses')}
                >
                    Saved Addresses
                </button>
                <button
                    className={`py-4 px-6 block font-medium transition-all ${
                        activeTab === 'password' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-500' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveTab('password')}
                >
                    Change Password
                </button>
                <button
                    className={`py-4 px-6 block font-medium transition-all ${
                        activeTab === 'orders' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-500' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                    onClick={() => { setActiveTab('orders'), featchMyOrders() }}
                >
                    My Orders
                </button>
            </nav>
                </div>
                <div className="p-6">
                    {activeTab === 'details' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Details</h2>
                            <form onSubmit={changeDetailshandler}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input type="text" name="name" defaultValue={user?.data?.name || ""} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input type="email" name="email" defaultValue={user?.data?.email} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                </div>
                                <div className="mb-4">
                                    <label className="block  text-gray-700">Contact</label>
                                    <input type="text" name="phone" defaultValue={user?.data?.phone} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                </div>
                                <button type="submit"  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">Save Changes</button>
                            </form>
                        </div>
                    )}
                    {activeTab === 'addresses' && (
                        <div>
                            <AddressPopup onSubmit={addressSaveHandler} onClose={() => setAddressPopup(false)} isOpen={address_popup} />
                            {isOpen && (
                                <EditAddressPopup
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    editData={selectedAddress}
                                    index={selectedAddressIndex}
                                    onSubmit={editAddressHandler}
                                />
                            )}
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Saved Addresses</h2>
                            <div>
                                {user?.data?.address?.length === 0 ? (
                                    <h1 className="mb-4 text-gray-700">No addresses saved</h1>
                                ) : (
                                    user?.data?.address?.map((address, index) => (
                                        <div key={index} className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/30 hover:shadow-md transition-shadow">
                                            
                                            <p className="text-gray-700 leading-relaxed">
                                            <span className="font-semibold">{address.Name}</span><br />
                                                {address.street}, {address.area},<br />
                                                {address.district}, {address.state},<br />
                                                {address.pincode}<br />
                                                {address.contact}
                                            </p>

                                            {/* Buttons for Edit and Delete */}
                                            {/* <EditAddressPopup isOpen={isOpen} editData={address} index={index} onClose={() => setIsOpen(!isOpen)} /> */}
                                            <div className="flex gap-2 mb-2 justify-end ">

                                            <button
                                                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all"
                                                    onClick={() => {
                                                        setSelectedAddress(address);
                                                        setSelectedAddressIndex(index);
                                                        setIsOpen(true);
                                                    }}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteAddressHandler(index)}
                                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                                                                               
                                            </div>
                                        </div>
                                        
                                    ))
                                )}
                            </div>
                            <button onClick={() => setAddressPopup(true)} type="submit"  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all transform  shadow-lg">
                                Add New Address
                            </button>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Change Password</h2>
                            <form onSubmit={changePasswordHandler}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Current Password</label>
                                    <input name="old-password" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">New Password</label>
                                    <input name="new-password" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Confirm New Password</label>
                                    <input name="conform-password" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <button type="submit"  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">Change Password</button>
                            </form>
                        </div>


                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
                            {orders?.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="mb-4">No orders found</p>
                                    <Link href="/store" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => {
                                        return (<div key={order._id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-semibold">Order ID: #{order._id}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Date: {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-sm `}>
                                                    {orderStatus[order.order_status]}
                                                </span>
                                            </div>

                                            <div className="border-t pt-2">
                                                {order.products.map((item, index) => {
                                                    console.log("Product Data:", item);

                                                    return (
                                                        <div key={index} className="flex items-center py-2">
                                                            <img
                                                                src={`http://localhost:5000/images/product/${item.id.main_image}`}
                                                                alt={item.main_image}
                                                                className="w-16 h-16 object-cover rounded mr-4"
                                                            />
                                                            <div className="flex-1">
                                                                <p className="font-medium">{item.name}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    Qty: {item.quantity} × ${item.discounted_price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                                                <p className="font-semibold">Total: ${order.final_total}</p>
                                                {/* <Link
                                                    href={`/order/${order._id}`}
                                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                                >
                                                    View Details
                                                </Link> */}
                                            </div>
                                        </div>)
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MyProfile;



const AddressPopup = ({ isOpen, onClose, onSubmit }) => {
    const [postoffices, setPostOffices] = useState([]);
    const [formData, setformData] = useState({
        name: "",
        street: "",
        area: "",
        district: "",
        state: "",
        pincode: "",
        contact: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
        // setformData((prev) => ({ ...prev, [name]: value }));
    };

    const pincodevalidation = (e) => {
        const pincode = e.target.value;
        if (pincode.length !== 6) {
            alert("Pincode must be 6 digits long");
        } else {
            axiosInstance
                .get(process.env.NEXT_PUBLIC_PINCODE_API + pincode)
                .then((response) => {
                    if (response.data[0]?.Status === "Success") {
                        const d = response.data[0].PostOffice;
                        setPostOffices(d);
                        setformData({ ...formData, state: d[0].State, district: d[0].District });
                        // setformData((prev) => ({
                        //     ...prev,
                        //     state: d[0].State,
                        //     district: d[0].District,
                        // }));
                    } else {
                        setPostOffices([]);
                        setformData({ ...formData, state: "", district: "" });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("formdata", formData);
        onSubmit(formData);
        setformData({
            name: "",
            street: "",
            area: "",
            district: "",
            state: "",
            pincode: "",
            contact: "",
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-[1]  inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border  ">
                <h2 className="text-lg font-bold mb-4">Enter Address Details</h2>
                <div className="grid gap-4 p-2 ">
                    <input
                        className="border p-2 rounded"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="border p-2 rounded"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    <input
                        className="border p-2 rounded"
                        name="pincode"
                        onBlur={pincodevalidation}
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />
                    <select
                        className="border p-2 rounded"
                        required
                        name="area"
                        onChange={handleChange}
                        value={formData.area}
                    >
                        <option value="">Select an area</option>
                        {postoffices.map((po, index) => (
                            <option key={index} value={po.Name}>
                                {po.Name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border p-2 rounded"
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        onChange={handleChange}
                    />
                    <input
                        className="border p-2 rounded"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    <input
                        className="border p-2 rounded"
                        name="contact"
                        placeholder="contact"
                        value={formData.contact}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};



const EditAddressPopup = ({ isOpen, onClose, editData, index, onSubmit }) => {
    const [postoffices, setPostOffices] = useState([]);
    const [editFormData, setEditFormData] = useState({
        name: "",
        street: "",
        area: "",
        district: "",
        state: "",
        pincode: "",
        contact: ""
    });

    useEffect(() => {
        if (editData) {
            setEditFormData(editData);
            if (editData.pincode) {
                validatePincode(editData.pincode);
            }
        }
    }, [editData]);

    const validatePincode = (pincode) => {
        if (pincode.length !== 6) return;

        axiosInstance.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => {
                if (response.data[0]?.Status === "Success") {
                    const poData = response.data[0].PostOffice || [];
                    if (poData.length > 0) {
                        setPostOffices(poData);
                        setEditFormData(prev => ({
                            ...prev,
                            state: poData[0]?.State || prev.state,
                            district: poData[0]?.District || prev.district,
                            area: poData[0]?.Name || prev.area
                        }));
                    }
                } else {
                    setPostOffices([]);
                }
            })
            .catch(error => {
                console.error("Error fetching pincode data:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...editFormData, index });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-[1]   inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border  ">
                <form onSubmit={handleSubmit}>
                    <h2 className='text-2xl font-bold '>Edit Address</h2>
                    <div className="grid gap-4 p-2 ">
                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            placeholder="Name"
                            required
                        />
                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="street"
                            value={editFormData.street}
                            onChange={(e) => setEditFormData({ ...editFormData, street: e.target.value })}
                            placeholder="Street"
                            required
                        />
                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="pincode"
                            value={editFormData.pincode}
                            onChange={(e) => {
                                const newPincode = e.target.value;
                                setEditFormData({ ...editFormData, pincode: newPincode });
                                if (newPincode.length === 6) {
                                    validatePincode(newPincode);
                                }
                            }}
                            placeholder="Pincode"
                            required
                        />
                        <select className='border p-2 rounded' name="area">
                            <option value="">Select an area</option>
                            {postoffices.map((po, index) => (
                                <option key={index}>{po.Name}</option>
                            ))}
                        </select>
                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="district"
                            value={editFormData.district}
                            onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                            placeholder="District"
                            required
                        />
                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="state"
                            value={editFormData.state}
                            onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                            placeholder="State"
                            required
                        />

                        <input
                            className='border p-2 rounded'
                            type="text"
                            name="contact"
                            value={editFormData.contact}
                            onChange={(e) => setEditFormData({ ...editFormData, contact: e.target.value })}
                            placeholder="Contact"
                            required
                        />

                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Save Changes</button>
                        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

