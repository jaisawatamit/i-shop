import Link from "next/link"

export const PageHeader = ({ breadcrums, button, trash }) => {
    return (
        <div className="flex justify-between items-center">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {
                        breadcrums.map(
                            (breadcrum, index) => {
                                return (
                                    <li key={index} className="inline-flex items-center">
                                        <svg style={{ display: index == 0 && 'none' }} class="rtl:rotate-180 w-3 h-3 cursor-pointer text-gray-900 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <div
                                            href="#"
                                            className='cursor-pointer inline-flex items-center text-sm font-medium !text-white
                                             !hover:text-blue-600 '>
                                            {breadcrum}
                                        </div>
                                    </li>
                                )
                            }
                        )
                    }
                </ol>
            </nav>

            {trash?.link !== undefined && (
                <Link
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    href={trash.link}
                >
                    View to Trash
                </Link>
            )}


            <Link className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
                href={button.url}>
                {button.text}
            </Link>
        </div>


    )
}