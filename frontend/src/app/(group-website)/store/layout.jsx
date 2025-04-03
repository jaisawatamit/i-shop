import ColorSelect from '@/componants/website/ColorSelect';
import Iphone6Section from '@/componants/website/Iphone6Section';
import Iphone8Section from '@/componants/website/Iphone8Section';
import RangeSelector from '@/componants/website/RangeSelector';
import Shorting from '@/componants/website/Shorting';
import { getCategories, getColors } from '@/library/api-colls';
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <>
            {/* Main Container */}
            <div className='max-w-[1340px] border m-2 mx-auto'>
                {/* Responsive Grid */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-[10px]'>
                    {/* Filter Section */}
                    <div className='md:col-span-1'>
                        <Filter />
                    </div>

                    {/* Main Content Section */}
                    <div className='col-span-1 md:col-span-3 max-w-full m-auto'>
                        <div>
                            <Iphone8Section />
                        </div>
                        <Shorting />
                        {children}
                    </div>
                </div>
            </div>

            {/* Iphone6Section */}

        </>
    );
}

const Filter = async () => {
    const categories = await getCategories();
    const colors = await getColors();
    return (
        <div className='hidden lg:block'>
            <div className="w-full p-4 col-span-1  rounded-md shadow-md">
                <div className="text-lg font-semibold uppercase text-gray-700 border-b pb-2 mb-4">
                    Filter
                </div>
                <ul className="grid grid-cols-1 gap-3">
                    <Link href={`/store`}>
                        <li className="cursor-pointer bg-white hover:bg-gray-200 transition-colors text-center py-2 px-4 rounded-md shadow-sm font-medium text-gray-600">
                            All
                        </li>
                    </Link>
                    {categories.map((cat) => (
                        <Link key={cat._id} href={`/store/${cat.slug}`}>
                            <li className="cursor-pointer flex justify-between items-center bg-white hover:bg-gray-200 transition-colors py-2 px-4 rounded-md shadow-sm font-medium text-gray-600">
                                <span>{cat.name}</span>
                                <span className="text-sm text-gray-500">({cat.ProductCount})</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            <ColorSelect colors={colors ?? []} />

            <div className="w-full  p-4 rounded-md shadow-md">
                <div className="text-lg font-semibold uppercase text-gray-700 border-b pb-2 mb-4">
                    Price
                </div>
                <RangeSelector />
            </div>
            <div className='w-[100%] mt-4 bg-white rounded-[5px] p-2'>

                <Link href={"/store"} className=''>
                    Reset All
                </Link>

            </div>
        </div>


    );
};



