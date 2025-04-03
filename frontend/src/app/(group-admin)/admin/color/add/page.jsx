'use client'

import { PageHeader } from '@/componants/admin/PageHeader';
import { axiosInstance } from '@/library/healper';
import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { titleToSlug } from '@/library/healper';

const AddColorPage = () => {
    const name = useRef(null);
    const hxcode = useRef(null);
    const color_code = useRef(null);
    const slug = useRef(null);
    // const [colorCode, setColorCode] = useState('#FFFFFF'); // Default color code
    const [nameError, setNameError] = useState(false);

    const nameChangeHandler = () => {

        slug.current.value = titleToSlug(name.current.value);

        axiosInstance.get(`/color/color-exists/${name.current.value}`)
            .then((response) => {
                if (response.data.flag === 1) {
                    setNameError(true);
                } else {
                    setNameError(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
            hxcode.current.value = color_code.current.value;
    };

    // const colorChangeHandler = (e) => {
    //     setColorCode(e.target.value); // Update color code on color change
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: name.current.value,
            code: color_code.current.value,
            slug: slug.current.value
        };
        // console.log(data);

        axiosInstance.post(`/color/create`, data)
            .then((response) => {
                // console.log(response);
                if (response.data.flag === 1) {
                    toast.success(response.data.message);
                    e.target.reset();
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div>
                <div className="py-6">
                    <PageHeader breadcrums={["Dashboard", "Colors", "Add"]}
                        button={{ text: 'Back to View', url: '/admin/color' }} />
                </div>
                <div className="bg-white p-10 rounded-2xl shadow-2xl w-[600px]">
                    <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                        Add New Color
                    </h2>

                    <form onSubmit={submitHandler} className="space-y-7">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                <span className="text-[17px] font-bold">Color Name</span>
                            </label>
                            <input
                                onChange={nameChangeHandler}
                                ref={name}
                                type="text"
                                id="name"
                                name="name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition hover:shadow-lg"
                                placeholder="Enter color name"
                                required
                            />
                            {nameError && <span className="text-red-500">Color name already exists</span>}
                        </div>
                        <div>
                            <label
                                htmlFor="slug"
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                <span className="text-[17px] font-bold">Color Name</span>
                            </label>
                            <input
                                ref={slug}
                                readOnly={true}
                                type="text"
                                id="slug"
                                name="slug"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition hover:shadow-lg"
                                placeholder="Enter color slug"
                                required
                            />
                        
                        </div>
                        {/* Color Picker Field */}
                        <div >
                            <label
                                htmlFor="colorCode"
                                className=" block text-sm font-medium text-gray-600 mb-2"
                            >
                                <span className="text-[17px] font-bold">Color Code</span>
                            </label>
                            <input 
                                onChange={nameChangeHandler}
                                ref={color_code}
                                type="color"
                                name="color_code"
                                id="colorCode"
                                className="w-full h-15 border-none cursor-pointer transition hover:shadow-lg"
                            />
                        </div>

                        {/* Hx Code Field */}
                        <div>
                            <label
                                htmlFor="hxcode"
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                <span className="text-[17px] font-bold">Hx Code</span>
                            </label>
                            <input
                                ref={hxcode}
                                type="text"
                                id="hxcode"
                                name="hxcode"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition hover:shadow-lg"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                disabled={nameError}
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-transform disabled:opacity-30"
                            >
                                <FaPlus className="inline-block mr-2" />
                                Add Color
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddColorPage;
