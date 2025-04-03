'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { emptyCart, quantity, removeFromCart, dbToCart, lsToCart } from '@/redux/slices/CartSlice';
import { getProducts } from '@/library/api-colls';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/library/healper';

export default function CartSideBar() {
    const [products, setProducts] = useState([]);
    const cart = useSelector(store => store.cart);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const featchData = async () => {
        const response = await getProducts();
        setProducts(response.Products);
    }

    useEffect(() => { featchData(); }, [])

    const deleteOrderHandler = async (product_id, color_id) => {
        try {
            const response = await axiosInstance.delete(`/cart/cartitem-delete/${user.data._id}`, { data: { product_id, color_id } });
            console.log(response);
            if (response.data.flag === 1) {
                console.log(response.data.flag);
                dispatch(removeFromCart({ product_id, color_id })); // Update Redux store directly
                localStorage.setItem("cart", JSON.stringify(cart.items.filter(item =>
                    !(item.product_id === product_id && item.color_id === color_id)
                )));
                toast.success(response.data.message);
                router.refresh();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };



    const clearCartHandler = () => {
        axiosInstance.delete(`/cart/cart-clear/${user?.data._id}`)
            .then(
                (response) => {


                    if (response.data.flag == 1) {
                        dispatch(emptyCart());
                        toast.success(response.data.message)
                    }
                }
            ).catch(
                (error) => {
                    toast.error(error.message)
                }
            )
    }

    const quantityHandler = async (value, product_id, color_id, original_price, discounted_price) => {
        const response = await axiosInstance.patch(`/cart/quantity/${user.data._id}`,
            { product_id, color_id, value }
        )
        if (response.data.flag == 1) {
            dispatch(quantity({ value, product_id, color_id, prices: { original_price, discounted_price } }))
            toast.success(response.data.message)
        }

    }


    return (
        <>
            <div className="w-full md:w-4/5 lg:w-3/4 xl:w-[900px] m-auto rounded-md bg-black bg-opacity-90 shadow-2xl">
                <div className="p-2 md:p-4 border-b border-gray-700 flex justify-center items-center gap-3 md:gap-5">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                        <FaShoppingCart />
                    </h2>
                    <h2 className='text-lg md:text-xl font-semibold text-white'>Shopping Cart</h2>
                </div>

                <div className="p-2 md:p-4 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
                    {cart?.items?.length > 0 && products?.length > 0 ? (
                        cart.items.map((item, index) => {
                            const product = products.find(p => p._id == item.product_id);
                            let color;
                            if (product) {
                                color = product?.colors?.find(c => c._id == item.color_id);
                            }

                            return (
                                <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 justify-between mb-4 bg-gray-800 p-2 md:p-3 rounded-lg shadow-md">
                                    <img
                                        src={`http://localhost:5000/images/product/${product?.main_image}`}
                                        alt={product?.name || "Product"}
                                        className="w-full md:w-24 lg:w-32 h-24 rounded-lg object-cover self-center"
                                    />

                                    <div className="text-white w-full md:w-40 flex-1">
                                        <h3 className="text-sm md:text-base font-medium">
                                            <span className="text-red-700 font-bold">Product:</span> {product?.name}
                                        </h3>
                                        <h4 className="text-xs md:text-sm">
                                            <span className="text-red-700 font-bold">Color:</span> {color?.name}
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-400">
                                            Original: <span className="line-through">${product?.original_price}</span>
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-400">
                                            Discounted: ${product?.discounted_price}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-400">
                                            Total: ${product?.discounted_price * item.quantity}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => quantityHandler(-1, product?._id, color?._id, product.original_price, product.discounted_price)} className="bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-all duration-300">
                                                <FaMinus className="text-xs md:text-sm" />
                                            </button>
                                            <span className="mx-2 text-white text-sm md:text-base">{item.quantity}</span>
                                            <button onClick={() => quantityHandler(1, product?._id, color?._id, product.original_price, product.discounted_price)} className="bg-green-500 text-white p-1 rounded-full shadow-md hover:bg-green-600 transition-all duration-300">
                                                <FaPlus className="text-xs md:text-sm" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => deleteOrderHandler(product?._id, color?._id)}
                                            className="text-gray-400 hover:text-red-500 transition-all duration-200 ml-4"
                                        >
                                            <FaTrash className="text-sm md:text-base" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
                    )}
                </div>
                <div className="p-2 md:p-4 my-4 md:my-8 border-t border-gray-700">
                    <div className="text-white text-lg font-semibold mb-4 flex justify-center items-center">
                        Total: ${cart.final_total}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={clearCartHandler}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all duration-300 w-full md:w-1/2">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
