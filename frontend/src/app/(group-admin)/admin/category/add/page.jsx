'use client'

import { PageHeader } from '@/componants/admin/PageHeader';
import { titleToSlug } from '@/library/healper';
import { axiosInstance } from '@/library/healper';
import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddCategoryPage = () => {
    // console.log(process.env.NEXT_PUBLIC_BASE_URL);

    const name = useRef(null);
    const slug = useRef(null);

    const [nameError, setNameError] = useState(false);

    const nameChangeHandler = () => {
        axiosInstance.get(`/category/category-exists/${name.current.value}`)
            .then((responce) => {
                // console.log(responce);
                // console.clear();
                if (responce.data.flag == 0) {
                    setNameError(true);
                } else {
                    setNameError(false);
                }
            })
            .catch((error) => {
                // console.log(error.message);
                console.log(error);
            })

        const nameValue = name.current.value;
        const slugValue = titleToSlug(nameValue);
        slug.current.value = slugValue;
    }


    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: name.current.value,
            slug: slug.current.value
        }
        console.log(data);
        axiosInstance.post(`/category/create`, data)
            .then((responce) => {
                if (responce.data.flag == 1) {
                    e.target.reset();
                    toast.success(responce.data.message);
                } else {
                    toast.error(responce.data.message);
                }

            }
            ).catch((error) => {
                console.log(error);
            }
            )
    }
    return (

        <div className="min-h-screen flex  items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div>
                <div className="py-6">
                    <PageHeader breadcrums={["Deshoard", "Category", "Add"]}
                        button={{ text: 'Back to View', url: '/admin/category' }} />
                </div>
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                        Add New Category
                    </h2>

                    <form onSubmit={submitHandler} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-600 mb-1"
                            >
                                <span className='text-[17px] font-bold'>Category Name</span>
                            </label>
                            <input
                                onChange={nameChangeHandler}
                                ref={name}
                                type="text"
                                id="name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                placeholder="Enter category name"
                                required
                            />
                            {nameError && <span className="text-red-500">Category already exists</span>}
                        </div>

                        {/* Slug Field */}
                        <div>
                            <label
                                htmlFor="slug"
                                className="block text-sm font-medium text-gray-600 mb-1"
                            >
                                <span className='text-[17px] font-bold'>Category Slug</span>
                            </label>
                            <input
                                ref={slug}
                                readOnly={true}
                                type="text"
                                id="slug"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                placeholder="Enter category slug"
                                required
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
                                Add Category
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddCategoryPage;



