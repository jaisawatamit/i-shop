'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Pagination({ total_product, limit }) {
    const [current_page, setCurrentPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const page_number = Number(searchParams.get("page")) || 1;
        setCurrentPage(page_number);
      }, [searchParams]);
    
      useEffect(
        ()=>{
          setCurrentPage(1)
          const url = new URL(window.location.href);
          url.searchParams.set("page", 1);
          router.push(url.toString());
        },[limit]
      )

    // useEffect(
    //     ()=>{
    //         const url = new URL(window.location.href);
    //         ur
    //     },[setCurrentPage]
    // )

    const setPageHandler = (page) => {
        setCurrentPage(page)
        const url = new URL(window.location.href)
        url.searchParams.set("page", page)
        router.push(url.toString())
    }
    const totalpage = Math.ceil(total_product / limit)
    const pageListing = [];
    for (let i = 1; i <= totalpage; i++) {
        pageListing.push(<li>
            <span key={i}
                onClick={() => setPageHandler(i)}
                className={`${current_page == i && "bg-red-600"} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
                {i}
            </span>
        </li>)
    }
    return (
        <nav aria-label="Page navigation example ">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <span onClick={() => setPageHandler(current_page - 1)}
                        className={`${current_page == 1 && "pointer-events-none"} flex items-center justify-center px-3 h-8 ms-0 leading-tight cursor-pointer text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                    >
                        Previous
                    </span>
                </li>
                {pageListing}
                <li>
                    <span onClick={() => setPageHandler(current_page + 1)}
                        className={`${current_page == totalpage && "pointer-events-none"} flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                        Next
                    </span>
                </li>
            </ul>
        </nav>
    );
}
