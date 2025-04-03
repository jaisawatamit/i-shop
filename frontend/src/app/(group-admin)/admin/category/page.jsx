import DeleteBtn from '@/componants/admin/DeleteBtn';
import { PageHeader } from '@/componants/admin/PageHeader';
import ToggleStatus from '@/componants/admin/ToggleStatus';
import { getCategories } from '@/library/api-colls';
import { TimeAgo } from '@/library/healper';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';



export default async function CategoryList() {
    const categories = await getCategories();
    return (
        <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="py-8">
                <PageHeader breadcrums={["Deshoard", "Category"]}
                    button={{ text: 'Add', url: '/admin/category/add' }}
                    trash={{ link: "/admin/category/trash" }} />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal ">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Sr.
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Upadetd At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-green-100 text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-yellow-100 text-sm">
                                            {category.name}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-purple-100 text-sm">
                                            {category.slug}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-100 text-sm">
                                            <ToggleStatus endpoint={`/category/change-status/${category._id}/`} current_status={category.status} />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-300 text-[15px] text-black text-sm">
                                            {TimeAgo(category.createdAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-300 text-[15px] text-black text-sm">
                                            {TimeAgo(category.updatedAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                            <div className='flex gap-3 items-center justify-center'>
                                                <DeleteBtn endpoint={`/category/move-to-trash/${category._id}`} />
                                                <Link href={`/admin/category/edit/${category._id}`}>
                                                    <FaEdit />
                                                </Link>
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
