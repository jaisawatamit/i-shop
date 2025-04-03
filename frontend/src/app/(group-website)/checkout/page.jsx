'use client';
import { axiosInstance } from '@/library/healper';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaHome, FaCreditCard, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import CartSideBar from '@/componants/website/CartSideBar';
import { emptyCart } from '@/redux/slices/CartSlice';
import { updateUserData } from '@/redux/slices/UserSlice';

const CheckoutPage = () => {
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(1);
    const [addressPopupOpen, setAddressPopupOpen] = useState(false);
    const [editAddressPopupOpen, setEditAddressPopupOpen] = useState(false);
    const [selectedAddressForEdit, setSelectedAddressForEdit] = useState(null);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();

    // Handlers for Address Management
    const addressSaveHandler = (data) => {
        axiosInstance.post(`/user/add-address/${user.data?._id}`, data)
            .then((response) => {
                if (response.data.flag === 1) {
                    dispatch(updateUserData({ user: response.data.updatedUser }));
                    toast.success("Address added successfully");
                }
            }).catch((err) => {
                console.error(err);
                toast.error("Failed to add address");
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

    const deleteAddressHandler = (index) => {
        axiosInstance.patch(`/user/delete-address/${user.data?._id}`, { index })
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

    // Checkout Handler
    const checkouthandler = () => {
        const data = {
            selectedPaymentOption,
            address: user?.data?.address[selectedAddress],
            user_id: user?.data?._id
        };
        axiosInstance.post('/order/create-order', data)
            .then((response) => {
                if (response.data.flag === 1) {
                    if (selectedPaymentOption === 1) {
                        dispatch(emptyCart());
                        router.push("/order-placed/" + response.data.order_id);
                    } else {
                        showPaymentPopUp(response.data.order_id, response.data.razorpay_order_id);
                    }
                } else {
                    console.log(response.data.message);
                }
            }).catch((err) => {
                console.log(err.message);
            });
    };

    const showPaymentPopUp = (order_id, razorpay_order_id) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            currency: "INR",
            name: "amit singh jaisawat",
            image: "https://example.com/your_logo",
            order_id: razorpay_order_id,
            handler: (razorpay_response) => {
                axiosInstance.post("/order/payment-success/", {
                    razorpay_response, order_id
                }).then((response) => {
                    if (response.data.flag === 1) {
                        dispatch(emptyCart());
                        router.push("/order-placed/" + response.data.order_id);
                    } else {
                        console.error("Payment Success API failed:", response.data);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            },
            prefill: {
                name: user.data.name,
                email: user.data.email,
                contact: user.data.contact,
            },
            theme: {
                color: "#F37254",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Checkout
            </h1>
            <div>
                <CartSideBar products={[]} cart={cart} />
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                {/* Address Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Address</h2>
                    <div className="space-y-3">
                        {(user?.data?.address || []).map((address, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedAddress(index)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3
                                    ${selectedAddress === index
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-200'}`}
                            >
                                <FaHome className="text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900">{address.name}</p>
                                    <p className="text-gray-600">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                                    <p className="text-gray-500 text-sm">📞 {address.contact}</p>
                                </div>
                                <div className="flex gap-2 ml-auto">
                                    <button
                                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedAddressForEdit(address);
                                            setSelectedAddressIndex(index);
                                            setEditAddressPopupOpen(true);
                                        }}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteAddressHandler(index);
                                        }}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setAddressPopupOpen(true)}
                        className="w-full mt-4 py-3 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all"
                    >
                        Add New Address
                    </button>
                </div>

                {/* Payment Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Options</h2>
                    <div className="space-y-3">
                        <div
                            onClick={() => setSelectedPaymentOption(1)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3
                                ${selectedPaymentOption === 1
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-200'}`}
                        >
                            <FaMoneyBillWave className="text-gray-500 text-lg" />
                            <span className="font-medium text-gray-900">Cash on Delivery</span>
                        </div>
                        <div
                            onClick={() => setSelectedPaymentOption(2)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3
                                ${selectedPaymentOption === 2
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-200'}`}
                        >
                            <FaCreditCard className="text-gray-500 text-lg" />
                            <span className="font-medium text-gray-900">Razorpay</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="max-w-xl mx-auto mt-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Original Total:</span>
                            <span className="font-medium text-gray-900">$ {Number(cart?.original_total).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Discount:</span>
                            <span className="text-green-600 font-medium">-${Number(cart?.original_total - cart?.final_total)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                            <span className="font-semibold text-gray-900">Final Total:</span>
                            <span className="font-bold text-lg text-blue-600">${cart?.final_total}</span>
                        </div>
                    </div>
                </div>
                {/* Place Order Button */}
                <button
                    onClick={checkouthandler}
                    className={`w-full mt-4 py-3 rounded-xl font-semibold text-lg transition-all
                        ${selectedAddress !== null && selectedPaymentOption
                            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    {selectedPaymentOption === 1
                        ? 'Place Order'
                        : 'Select Address & Payment Option'}
                </button>
            </div>

            {/* Address Popups */}
            <AddressPopup
                isOpen={addressPopupOpen}
                onClose={() => setAddressPopupOpen(false)}
                onSubmit={addressSaveHandler}
            />
            {editAddressPopupOpen && (
                <EditAddressPopup
                    isOpen={editAddressPopupOpen}
                    onClose={() => setEditAddressPopupOpen(false)}
                    editData={selectedAddressForEdit}
                    index={selectedAddressIndex}
                    onSubmit={editAddressHandler}
                />
            )}
        </div>
    );
};

// Address Popup Component
const AddressPopup = ({ isOpen, onClose, onSubmit }) => {
    const [postoffices, setPostOffices] = useState([]);
    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [name]: value });
    };

    const pincodeValidation = (e) => {
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
                        setFormData({ ...formData, state: d[0].State, district: d[0].District });
                    } else {
                        setPostOffices([]);
                        setFormData({ ...formData, state: "", district: "" });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: "",
            street: "",
            area: "",
            district: "",
            state: "",
            pincode: "",
            contact: ""
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-[1] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border">
                <h2 className="text-lg font-bold mb-4">Enter Address Details</h2>
                <div className="grid gap-4 p-2">
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
                        onBlur={pincodeValidation}
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
                        placeholder="Contact"
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

// Edit Address Popup Component
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
        <div className="fixed z-[1] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold">Edit Address</h2>
                    <div className="grid gap-4 p-2">
                        <input
                            className="border p-2 rounded"
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            placeholder="Name"
                            required
                        />
                        <input
                            className="border p-2 rounded"
                            type="text"
                            name="street"
                            value={editFormData.street}
                            onChange={(e) => setEditFormData({ ...editFormData, street: e.target.value })}
                            placeholder="Street"
                            required
                        />
                        <input
                            className="border p-2 rounded"
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
                        <select className="border p-2 rounded" name="area">
                            <option value="">Select an area</option>
                            {postoffices.map((po, index) => (
                                <option key={index}>{po.Name}</option>
                            ))}
                        </select>
                        <input
                            className="border p-2 rounded"
                            type="text"
                            name="district"
                            value={editFormData.district}
                            onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                            placeholder="District"
                            required
                        />
                        <input
                            className="border p-2 rounded"
                            type="text"
                            name="state"
                            value={editFormData.state}
                            onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                            placeholder="State"
                            required
                        />
                        <input
                            className="border p-2 rounded"
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

export default CheckoutPage;