import Iphone6Section from '@/componants/website/Iphone6Section';
import ProductCard from '@/componants/website/ProductCard';
// import ProductDetailsPage from '@/componants/website/ProductDetails';
import SectionSecond from '@/componants/website/SectionSecond';
import Features from '@/componants/website/ShippingCompo';
import SliderPage from '@/componants/website/Slider';
import { getProducts } from '@/library/api-colls';

export default async function HomePage() {
    const response = await getProducts();
    return (
        <>
            <div>
                <SectionSecond />
            </div>
            <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 md:py-12 lg:py-16">
                <main className="flex flex-col items-center justify-center flex-grow p-2">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#22262A]">BEST SELLER</h2>
                    <div className="flex flex-nowrap justify-between items-center overflow-x-auto gap-5 px-2 py-2 font-bold rounded-full shadow-sm border border-gray-100">
                        <button className="hover:text-white transition">All</button>
                        <button className="hover:text-white transition">Mac</button>
                        <button className="hover:text-white transition">iPhone</button>
                        <button className="hover:text-white transition">iPad</button>
                        <button className="hover:text-white transition">iPod</button>
                        <button className="hover:text-white transition">Accessories</button>
                    </div>
                </main>

                {/* Product Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full max-w-[80rem] mx-auto">
                    {response.Products && response.Products.length > 0 ? (
                        response.Products.map((prod, index) => (
                            <div key={prod._id || index} className="w-full max-w-[300px] mx-auto">
                                <ProductCard showDiscount={true} {...prod} className="w-full h-full" />
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-full text-lg">No products found.</div>
                    )}
                </section>
            </div>

            {/* Additional Sections */}
            <div >
                <Iphone6Section />
            </div>
            <div >
                <Features />
            </div>
            <div >
                <SliderPage />
            </div>
            {/* <div>

<ProductDetailsPage/>
            </div> */}
        </>
    );
}







{/* <div className="min-h-screen bg-gray-50 py-8 md:py-12 lg:py-16">
    <main className="flex flex-col items-center justify-center flex-grow p-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            BEST SELLER
        </h2>
        <div className="flex flex-nowrap overflow-x-auto gap-4 w-full max-w-4xl px-4 py-3 bg-white/90 backdrop-blur-lg rounded-full shadow-sm border border-gray-100">
            {['All', 'Mac', 'iPhone', 'iPad', 'iPod', 'Accessories'].map((cat) => (
                <button 
                    key={cat}
                    className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-pink-500 whitespace-nowrap transition-colors"
                >
                    {cat}
                </button>
            ))}
        </div>
    </main>


    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full max-w-[90rem] mx-auto">
        {products?.map((prod) => (
            <div key={prod._id} className="w-full max-w-[300px] mx-auto">
                <ProductCard 
                    showDiscount={true} 
                    {...prod} 
                    className="w-full h-full"
                />
            </div>
        ))}
    </section>
</div> */}
