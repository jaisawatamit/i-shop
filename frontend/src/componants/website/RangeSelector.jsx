'use client';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function RangSelector() {
    const pathName = usePathname();
    const [range, setRange] = useState({ min: 100, max: 2000 });
    const router = useRouter();
    const chagneHandler = (data) => {
        setRange({
            min: data[0],
            max: data[1]
        })
        // getRangeQuery(data)
        // router.push(pathName + "?"+ getRangeQuery(data));
    } 
    
    useEffect(
        ()=>{
             const currentUrl = new URL(window.location.href);
             const searchParams = currentUrl.searchParams;
             if(searchParams.get('min') == null || searchParams.get('max') == null){
                setRange({ min: 100, max: 2000 });

             }else{
                setRange({min: Number(searchParams.get('min')), max: Number(searchParams.get('max'))})
             }
        },[pathName]
    )
    // const getRangeQuery = (data)=>{
    //     const query = new URLSearchParams();
    //     query.append('min', data[0]);
    //     query.append('max', data[1]);
    //     return query.toString();  
    // }
    const applyPriceRange = ()=>{
        // router.push(pathName + "?"+ getRangeQuery([range.min, range.max]));

        const url = new URL(window.location.href);
        url.searchParams.set("min", range.min);
        url.searchParams.set("max", range.max);
        router.push(url.toString());

    }
        
    return (
        <div>
            <RangeSlider onInput={(data) => chagneHandler(data)} min="100" max="2000" defaultValue={[range.min, range.max]} />
            <div className="flex gap-4 justify-between my-4 items-center">
                {/* Minimum Value */}
                <div className="w-[22%] flex flex-wrap items-center justify-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
                    <input
                        type="text"
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={`$${range.min}`}
                    />
                </div>

                {/* Maximum Value */}
                <div className="w-[26%] flex flex-wrap items-center justify-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
                    <input
                        type="text"
                        readOnly
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        value={`$ ${range.max}`}
                    />
                </div>
            </div>

            <button onClick={applyPriceRange} className='p-2 block w-full text-white bg-blue-400 font-bold '>Apply</button>

        </div>
    );
}
