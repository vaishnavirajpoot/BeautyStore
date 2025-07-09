import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/Appcontext';

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16 bg-[#fceeea] py-12 px-4 rounded-t-3xl">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#5e3b3b] font-serif tracking-wide">
        OUR BESTSELLER
        </h2>
        <p className="text-[#8e6c6c] mt-2 text-base">
          Your most loved skincare & makeup picks ✨
        </p>
        <div className="w-24 h-1.5 bg-[#e9bcbc] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Horizontal product scroll */}
      <div id="best" className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 px-2 md:px-6">
          {products
            .filter((product) => product.inStock)
            .slice(0, 10)
            .map((product, index) => (
              <div
                key={index}
                className="min-w-[200px] md:min-w-[200px] bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-2 transition hover:shadow-xl hover:scale-[1.02]"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
