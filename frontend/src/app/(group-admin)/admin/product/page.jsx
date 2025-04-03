import DeleteBtn from '@/componants/admin/DeleteBtn';
import MultipalImagePage from '@/componants/admin/MiltipalImage';
import { PageHeader } from '@/componants/admin/PageHeader';
import Pagination from '@/componants/admin/Pagination';
import ToggleStatus from '@/componants/admin/ToggleStatus';
import { getProducts } from '@/library/api-colls';
import { TimeAgo } from '@/library/healper';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

export default async function ProductPage({ searchParams }) {
    let limit = null;
    let page = null;
    if (searchParams.page) {
        page = searchParams.page
    }
    if (searchParams.limit) {
        limit = searchParams.limit
    }
    const response = await getProducts(null, null, null, null, page, limit);
    console.log(response);

    return (
        <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="py-8">
                <PageHeader breadcrums={["Deshoard", "Product"]}
                    button={{ text: 'Add', url: '/admin/product/add' }}
                    trash={{ link: "/admin/product/trash" }} />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto  ">
                    <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden ">
                        <table className="min-w-full leading-normal ">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Sr.
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Name / Slug
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Thumabnail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        TimeStamps
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Category / Color
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {response.Products.map((product, index) => (
                                    <tr key={product._id} className="hover:bg-gradient-to-r from-gray-50 to-gray-100 transition duration-300">
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-green-200 to-green-100 text-sm rounded-l-lg">
                                            <span className="font-bold">{index + 1}</span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-yellow-200 to-yellow-100 text-sm">
                                            <span className="block font-semibold">{product.name}</span>
                                            <span className="text-gray-500 text-xs">{product.slug}</span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-200 to-purple-100 text-sm">
                                            <span className="line-through text-gray-400">{product.original_price}</span>
                                            <br />
                                            <span className="text-green-600 font-bold">{product.discounted_price}</span>
                                            <br />
                                            <span className="text-red-500 text-xs">{product.discount_percent}% OFF</span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-200 to-blue-100 text-sm">
                                            <img src={`http://localhost:5000/images/product/${product.main_image}`} className="w-12 h-12" />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-300 to-blue-200 text-[15px] text-black text-sm">
                                            <ToggleStatus
                                                endpoint={`/product/change-status/${product._id}/`}
                                                current_status={product.status}
                                            />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-300 to-blue-200 text-[15px] text-black text-sm">
                                            createdAt:<span className="text-gray-600">{TimeAgo(product.createdAt)}</span>
                                            <br />
                                            updatedAt:<span className="text-gray-600">{TimeAgo(product.updatedAt)}</span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-yellow-200 to-yellow-100 text-sm ">
                                            category: <span className="text-gray-600">{product.category.name}</span>
                                            <br />
                                            colors: {product.colors.map(
                                                (color, index) => (

                                                    <span key={index} className="text-gray-600">{color.name}</span>
                                                ))}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-white to-gray-100 text-sm text-center rounded-r-lg">
                                            <div className="flex gap-3 items-center justify-center">
                                                <DeleteBtn
                                                    endpoint={`/product/move-to-trash/${product._id}`}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition duration-300"
                                                />
                                                <Link href={`/admin/product/edit/${product._id}`} className="text-blue-500 hover:text-blue-700">
                                                    <FaEdit className="text-lg" />
                                                </Link>

                                                <MultipalImagePage product_id={product._id} name={product.name} other_images={product.other_images} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <Pagination {...response} />
                </div>
            </div>
        </div>
    );
}

