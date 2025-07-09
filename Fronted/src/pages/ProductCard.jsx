import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-2  hover:scale-[1.02] transition-transform">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 sm:h-48 object-cover rounded-md mb-2"
      />
      <h2 className="text-sm sm:text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-xs sm:text-base text-gray-700 mb-1">Price: ₹{product.price}</p>
      <p className="text-xs text-gray-500">{product.category}</p>
    </div>
  );
};

export default ProductCard;
