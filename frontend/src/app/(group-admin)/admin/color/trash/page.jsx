import DeleteBtn from '@/componants/admin/DeleteBtn';
import { PageHeader } from '@/componants/admin/PageHeader';
import RestoreBtn from '@/componants/admin/RestoreBtn';
import ToggleStatus from '@/componants/admin/ToggleStatus';
import { getTrashedColor } from '@/library/api-colls';
import { TimeAgo } from '@/library/healper';




export default async function TrashPage() {
    const colors = await getTrashedColor();
    return (
        <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="py-8">
                <PageHeader breadcrums={["Deshboard", "Color", "Trash"]}
                    button={{ text: 'Back to View', url: '/admin/color' }} />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal ">
                        <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Sr.
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Name /Color_view
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        code
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
                                {colors.map((color, index) => (
                                    <tr key={color._id}>
                                          <td className="px-5 py-5 border-b border-gray-200 bg-green-100 text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 uppercase py-5 flex gap-6 items-center justify-center border-b border-gray-200 bg-yellow-100 text-sm">
                                            {color.name}
                                            <td className='rounded-full' style={{ backgroundColor: color.code, width: '50px', height: '50px' }}>   
                                            </td>
                                        </td>
                                        <td className="uppercase px-5 py-5 border-b border-gray-200 bg-purple-100 text-sm">
                                            {color.code}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-100 text-sm">
                                            <ToggleStatus endpoint={`/color/change-status/${color._id}/`} current_status={color.status} />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-300 text-[15px] text-black text-sm">
                                            {TimeAgo(color.createdAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-yellow-300 text-[15px] text-black text-sm">
                                            {TimeAgo(color.updatedAt)}
                                        </td>
                                        
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                            <div className='flex gap-3 items-center justify-center'>
                                                <DeleteBtn endpoint={`/color/delete/${color._id}`} />
                                                <div>
                                                    <RestoreBtn endpoint={`/color/patch-restore/${color._id}`} />
                                                </div>
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