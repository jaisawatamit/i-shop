


import Iphone8Section from '@/componants/website/Iphone8Section';
import ProductCard from '@/componants/website/ProductCard';
import { getProducts } from '@/library/api-colls';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

export default async function StorePage({ params, searchParams }) {
  // console.log(params.category_slug);
  // console.log(searchParams.color);
  let range = null;
  let limit = null;
  let page = null;
  let price_sort = null

  if (searchParams.price_sort) {
    price_sort = searchParams.price_sort
  }
  if (searchParams.page) {
    page = searchParams.page
  }
  if (searchParams.limit) {
    limit = searchParams.limit
  }
  if (searchParams.min && searchParams.max) {
    range = {
      max: Number(searchParams.max),
      min: Number(searchParams.min),
    }

  }
  let color = null;
  if (searchParams?.color) {
    color = searchParams.color
  }
  let view = searchParams?.view ?? "grid";
  const response = await getProducts(params.category_slug, range, price_sort, page, limit);
  console.log(response);


  return (
    <>
      <div className={`col-span-3 grid  gap-2 my-4 ${view = "grid" ? "grid-cols-3" : "grid-cols-1"}`}>
        {
          response.Products.map(
            (prod) => <ProductCard key={prod._id} {...prod} />
          )
        }
      </div>
    </>

  );
}
