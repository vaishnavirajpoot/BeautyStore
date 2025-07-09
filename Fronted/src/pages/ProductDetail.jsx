import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../greencart_assets/assets';
import ProductCard from '../components/ProductCard.jsx';
import { Star, StarOff } from "lucide-react";

const ProductDetail = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item._id === id);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  useEffect(() => {
    if (products.length > 0 && product) {
      const filtered = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  return (
    product && (
      <div className="mt-4 px-4 md:px-10 lg:px-16  min-h-screen pb-20">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500">
          <Link to="/" className="text-gray-400">Home</Link> /
          <Link to="/products" className="text-gray-400"> Products </Link> /
          <Link to={`/products/${product.category.toLowerCase()}`} className="text-gray-400">{product.category}</Link> /
          <span className="text-[#4b3f36] font-medium"> {product.name}</span>
        </p>

        {/* Main Section */}
        <div className="mt-8 flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Left - Image Section */}
          <div className="md:w-1/2 w-full bg-[#f7ede7] p-4 rounded-2xl shadow-md max-w-[500px] mx-auto md:mx-0">
            <img
              src={thumbnail}
              alt={product.name}
              className="rounded-xl object-contain w-full h-[350px] md:h-[420px]"
            />
          </div>

          {/* Right - Description */}
          <div className="md:w-1/2 w-full text-[#4b3f36] text-sm space-y-5">
            <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>

            {/* Rating */}
           <div className="flex items-center gap-1">
  {Array(5).fill("").map((_, i) =>
    i < 4 ? (
      <Star key={i} size={16} className="text-[#8c725f] fill-[#4b3f36]" />
    ) : (
      <StarOff key={i} size={16} className="text-gray-400" />
    )
  )}
  <p className="text-[#7a6c5d] ml-2 text-base">(4)</p>
</div>


            {/* Price Section */}
            <div>
              <p className="line-through text-gray-400 text-sm">
                MRP: {currency}{product.price}
              </p>
              <p className="text-xl font-semibold text-[#b08968]">
                MRP: {currency}{product.offerPrice}
              </p>
              <span className="text-xs text-gray-500">(inclusive of all taxes)</span>
            </div>

            {/* About Product */}
            <div>
              <p className="font-medium text-base mb-1">About Product</p>
              <ul className="list-disc pl-5 text-[#6d5c4d] text-sm space-y-1">
                {product.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3 bg-[#4b3f36] hover:bg-[#9f7a56] text-white font-medium rounded-lg transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate('/cart');
                }}
                className="w-full py-3 bg-[#4b3f36] hover:bg-[#9f7a56] text-white font-medium rounded-lg transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <p className="text-xl font-medium text-[#4b3f36]">Related Products</p>
            <div className="w-20 h-1 bg-[#b08968] rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {relatedProducts
              .filter((p) => p.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>

          <button
            onClick={() => {
              navigate('/products');
              scrollTo(0, 0);
            }}
            className="mx-auto block mt-12 px-10 py-2.5 border border-[#b08968] text-[#b08968] rounded hover:bg-[#f0e8dd] transition"
          >
            See more
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
