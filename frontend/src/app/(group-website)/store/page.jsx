import Pagination from '@/componants/website/Pagination';
import ProductCard from '@/componants/website/ProductCard';
import { getProducts } from '@/library/api-colls';

export default async function StorePage({ searchParams }) {
  searchParams = await searchParams; 
  let range = null;
  let limit = null;
  let page = null;
  let price_sort = null;
  
  if (searchParams.price_sort) {
    price_sort = searchParams.price_sort;
  }
  if (searchParams.page) {
    page = searchParams.page;
  }
  if (searchParams.limit) {
    limit = searchParams.limit;
  }
  if (searchParams.min && searchParams.max) {
    range = {
      max: Number(searchParams.max),
      min: Number(searchParams.min),
    };
  }
  
  let color = null;
  if (searchParams?.color) {
    color = searchParams.color;
  }
  
  // Remove 'await' here, as searchParams is a plain object
  let view = searchParams?.view || "grid";  

  // Fetch product data
  const response = await getProducts(null, range, price_sort, color, page, limit);
  
  return (
    <>
      <div className={`col-span-3 grid gap-2 my-4 item-place-center
        ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}
      `}>
        {response.Products && response.Products.length > 0 ? (
          response.Products.map((prod) => <ProductCard  key={prod._id} {...prod} />)
        ) : (
          <div>No products found.</div>
        )}
      </div>
      <Pagination {...response} />
    </>
  );
}
