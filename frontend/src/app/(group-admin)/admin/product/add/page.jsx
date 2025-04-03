'use client'

import { PageHeader } from '@/componants/admin/PageHeader';
import { getCategories, getColors } from '@/library/api-colls';
import { titleToSlug } from '@/library/healper';
import { axiosInstance } from '@/library/healper';
import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Select from 'react-select'
import ImageUploder from '@/componants/admin/ImageUploder';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const name = useRef(null);
    const slug = useRef(null);
    const original_price = useRef(null);
    const discounted_price = useRef(null);
    const discount_percent = useRef(null);
    const [nameError, setNameError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [color, setColor] = useState([]);
    const [product_color, setProductColor] = useState([]);

    const getData = async () => {
        const categoryData = await getCategories();
        setCategories(categoryData);
        const colorData = await getColors();
        setColor(colorData);
    }

    // console.log("categories" ,categories);
    // console.log("color", color);


    useEffect(
        () => {
            getData();
        }, []
    )
    const nameChangeHandler = () => {
        // axiosInstance.get(`/product/product-exists/${name.current.value}`)
        //     .then((responce) => {
        //         // console.log(responce);
        //         // console.clear();
        //         if (responce.data.flag == 0) {
        //             setNameError(true);
        //         } else {
        //             setNameError(false);
        //         }
        //     })
        //     .catch((error) => {
        //         // console.log(error.message);
        //         console.log(error);
        //     })
        const nameValue = name.current.value;
        const slugValue = titleToSlug(nameValue);
        slug.current.value = slugValue;
    }
    const colorChangeHandeler = (option) => {
        // console.log(option);
        const ids = option.map(opt => opt.value);
        setProductColor(ids);
    }
    const priceChangeHandler = () => {
        const original_price_data = original_price.current.value;
        const discounted_price_data = discounted_price.current.value;
        // const discount_percent = discount_percent.current.value;
        if (original_price_data != 0 && discounted_price_data != 0) {
            const FinalPrice = ((original_price_data - discounted_price_data) * 100) / original_price_data;
            // console.log(discount_percent);
            discount_percent.current.value = Math.round(FinalPrice) + "%"
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('slug', e.target.slug.value);
        formData.append('category', e.target.category.value);
        formData.append('colors', JSON.stringify(product_color));
        formData.append('original_price', e.target.Original_Price.value);
        formData.append('discounted_price', e.target.Discounted_Price.value);
        formData.append('discount_percent', e.target.discount_percent.value);
        //  formData.append('thumbnail', e.target.thumbnail.files[0]);
        formData.append('image', image);

        // console.log(data);
        axiosInstance.post(`/product/create`, formData)
            .then((responce) => {
                console.log("Response:", responce);
                if (responce.data.flag == 1) {
                    e.target.reset();
                    router.push("/admin/product");
                    toast.success(responce.data.message);
                } else {
                    toast.error(responce.data.message);
                }
            }
            ).catch((error) => {
                console.error("API Error:", error);
                toast.error("Something went wrong!");
            }
            )
    }
    return (
        <div className="min-h-screen px-20  bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div>
                <div className="py-3">
                    <PageHeader breadcrums={["Deshoard", "Product", "Add"]}
                        button={{ text: 'Back to View', url: '/admin/product' }} />
                </div>
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full  max-w-5xl">
                    <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                        Add New Product
                    </h2>
                    <form onSubmit={submitHandler} className="space-y-3">
                        {/* Name and Slug Fields */}
                        <div className="flex space-x-4">
                            {/* Name Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold"> Name</span>
                                </label>
                                <input
                                    onChange={nameChangeHandler}
                                    ref={name}
                                    type="text"
                                    id="name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                    placeholder="Enter Product name"
                                    required
                                />
                                {nameError && <span className="text-red-500">Product already exists</span>}
                            </div>

                            {/* Slug Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold"> Slug</span>
                                </label>
                                <input
                                    ref={slug}
                                    readOnly={true}
                                    type="text"
                                    id="slug"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                    placeholder="Enter Product slug"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {/* Name Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold">Category</span>
                                </label>
                                <Select name="category" options={
                                    categories.map(cat => {
                                        return {
                                            value: cat._id,
                                            label: cat.name
                                        }
                                    })
                                } />
                                {/* <select name="" id="">
                                    <option value="">
                                        Select a Category
                                    </option>
                                    {
                                        categories.map(
                                           (cat)=>{
                                                 return <option>{cat.name}</option>
                                           } 
                                        )
                                    }
                                </select> */}
                                {nameError && <span className="text-red-500">Product already exists</span>}
                            </div>
                            {/* Slug Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="colors"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold">Colors</span>
                                </label>
                                <Select onChange={(option) => colorChangeHandeler(option)} closeMenuOnSelect={false} isMulti options={
                                    color.map(col => {
                                        return {
                                            value: col._id,
                                            label: col.name
                                        }
                                    })
                                } />
                                {/* <select name="" id="">
                                    <option value="">
                                        Select Colors
                                    </option>
                                    {
                                        color.map(
                                            (col) => {
                                                return <option value={col._id}>{col.name}</option>
                                            }
                                        )
                                    }
                                </select> */}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {/* Name Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="Original_Price"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold"> Original Price</span>
                                </label>
                                <input
                                    onChange={priceChangeHandler}
                                    ref={original_price}
                                    type="number"
                                    id="Original_Price"
                                    name="Original_Price"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                    placeholder="Enter Original Price"
                                    required
                                />
                                {/* {nameError && <span className="text-red-500">Product already exists</span>} */}
                            </div>
                            {/* Slug Field */}
                            <div className="w-1/2">
                                <label
                                    htmlFor="Discounted_Price"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold"> Discounted Price</span>
                                </label>
                                <input
                                    onChange={priceChangeHandler}
                                    ref={discounted_price}
                                    type="number"
                                    id="Discounted_Price"
                                    name="Discounted_Price"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                    placeholder="Enter Discounted Price"
                                    required
                                />
                                {/* {nameError && <span className="text-red-500">Product already exists</span>} */}
                            </div>
                            <div className="w-1/2">
                                <label
                                    htmlFor="discount_percent"
                                    className="block text-sm font-medium text-gray-600 mb-1"
                                >
                                    <span className="text-[17px] font-bold"> Discount Percent</span>
                                </label>
                                <input
                                    ref={discount_percent}
                                    readOnly={true}
                                    type="text"
                                    name="discount_percent"
                                    id="discount_percent"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                                    placeholder="Enter Discount Percent"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-2 border'>
                            <label
                                htmlFor="discount_percent"
                                className="block text-sm font-medium text-gray-600 mb-1"
                            >
                                <span className="text-[17px] font-bold"> Upload Image</span>
                            </label>
                            <ImageUploder onImageSelect={(d) => setImage(d)} isMulti={false} />
                        </div>
                        <div className="text-center py-6">
                            <button
                                disabled={nameError}
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py- px-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-transform disabled:opacity-30"
                            >
                                <FaPlus className="inline-block mr-2" />
                                Add Product
                            </button>
                        </div>
                    </form>
                    {/* Submit Button */}

                </div>
            </div>
        </div>
    );
};
export default AddProductPage;



