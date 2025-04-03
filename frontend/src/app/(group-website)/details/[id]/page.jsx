'use client'
import CartBtn from '@/componants/website/CartBtn'
// import { getProducts } from '@/library/api-colls'
import { axiosInstance } from '@/library/healper'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      setProduct(response.data.Product);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-white text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${product.main_image}`}
              alt={product?.name || 'Product Image'}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index 
                    ? 'border-blue-500 scale-105 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product?.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 fill-current ${i < 4 ? 'text-amber-500' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                ({product?.reviews || 0} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">
                ${product?.discounted_price}
              </span>
              {product?.original_price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product?.original_price}
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {product?.description}
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                  <CartBtn
                    prices={{
                      original_price: product.original_price,
                      discounted_price: product.discounted_price,
                    }}
                    product_id={product._id}
                    colors={product.colors}
                  />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold text-gray-900">Features</h3>
              <ul className="space-y-3">
                {product?.features?.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start space-x-3 text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Specifications
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product?.specs &&
                  Object.entries(product.specs).map(([key, value]) => (
                    <div 
                      key={key}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-gray-900">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage