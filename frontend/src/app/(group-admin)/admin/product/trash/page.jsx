import DeleteBtn from '@/componants/admin/DeleteBtn';
import MultipalImagePage from '@/componants/admin/MiltipalImage';
import { PageHeader } from '@/componants/admin/PageHeader';
import RestoreBtn from '@/componants/admin/RestoreBtn';
import ToggleStatus from '@/componants/admin/ToggleStatus';
import { getTrashedProduct } from '@/library/api-colls';
import { TimeAgo } from '@/library/healper';

export default async function TrashPage() {
    const Products = await getTrashedProduct();
    return (
        <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="py-8">
                <PageHeader breadcrums={["Deshoard", "Product", "Trash"]}
                    button={{ text: 'Back to View', url: '/admin/product' }} />
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
                                       Thumbnail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Deleted At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {Products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-green-100 text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-yellow-100 text-sm">
                                            {product.name}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-200 to-blue-200 text-sm">
                                            <img src={`http://localhost:5000/images/product/${product.main_image}`} className="w-12 h-12" />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-100 text-sm">
                                            {product.slug}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-purple-100 text-sm">
                                            <ToggleStatus endpoint={`/product/change-status/${product._id}/`} current_status={product.status} />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-300  text-black text-sm">
                                            {TimeAgo(product.deletedAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                            <div className='flex gap-3 items-center justify-center'>
                                                <DeleteBtn endpoint={`/product/delete/${product._id}`} />
                                                <div>
                                                    <RestoreBtn endpoint={`/product/patch-restore/${product._id}`} />
                                                </div>
                                                <MultipalImagePage product_id={product._id} name={product.name} other_images={product.other_images} />
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