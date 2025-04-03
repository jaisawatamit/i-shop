'use client'
// import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ColorSelect({ colors }) {
    const router = useRouter();
    const pathname = usePathname();
    const [selected_color, setSelectedColor] = useState([]);

    const ColorSelectHandler = (col_slug) => {

        setSelectedColor((prevColors) =>
            prevColors.includes(col_slug)
                ? prevColors.filter((id) => id !== col_slug)
                : [...prevColors, col_slug]
        );
    };

    useEffect(
        () => {
            const currentUrl = new URL(window.location.href);
            const searchParams = currentUrl.searchParams;
            if (searchParams.get('color') == null) {
                setSelectedColor([]);
            } else {
                setSelectedColor(searchParams.get('color').split(","))
            }

        }, [pathname]
    )

    useEffect(
        () => {
            console.log("value", selected_color);
            const url = new URL(window.location.href);
            if (selected_color.length != 0) {
                url.searchParams.set("color", selected_color.toString())
                // router.push(`${pathname}? color= ${selected_color}`)
            } else {
                url.searchParams.delete("color")
            }
            router.push(url.toString());
        }, [selected_color, router]
    )
    return (
        <div className="w-full mt-5 p-4 rounded-md shadow-md">
            <div className="text-lg font-semibold uppercase text-gray-700 border-b pb-2 mb-4">
                Colors
            </div>
            <div className="flex flex-wrap gap-2 p-1">

                {colors.map((col, index) => (

                    <div onClick={() => ColorSelectHandler(col.slug)} key={index} title={col.name} className="cursor-pointer flex flex-wrap justify-center items-center py-1 px-1 rounded-full shadow-sm  border border-white ">
                        <div>
                            <span className='block p-2 rounded-full outline outline-gray-200 ' style={{
                                background: col.code
                            }}></span>
                        </div>
                        {/* <span className="text-sm text-gray-500">({col.ProductCount})</span> */}
                    </div>

                ))}
            </div>
        </div>
    );
}
