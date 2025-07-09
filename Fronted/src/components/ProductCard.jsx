import React from "react";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../greencart_assets/assets";
import { Star, StarOff } from "lucide-react";


const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return product && (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="bg-white/90 border border-[#f0cfcf] rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition duration-300 min-w-[180px] max-w-[200px] px-3 py-4 cursor-pointer"
    >
      {/* Product Image */}
      <div className="flex items-center justify-center mb-3">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-24 h-24 object-contain group-hover:scale-105 transition"
        />
      </div>

      {/* Product Info */}
      <div className="text-[#5e3b3b] text-sm font-sans">
        <p className="text-xs text-[#9c7c7c] mb-1">{product.category}</p>
        <h3 className="font-semibold text-base truncate">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
  {Array(5).fill("").map((_, i) =>
    i < 4 ? (
      <Star key={i} size={16} className="text-[#cca2a2]  fill-[#5e3b3b] " />
    ) : (
      <StarOff key={i} size={16} className="text-gray-400" />
    )
  )}
  <p className="text-[#7a6c5d] ml-2 text-base">(4)</p>
</div>

        {/* Price & Cart */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-[#e06d6d] font-semibold text-lg leading-tight">
              {currency}{product.offerPrice}
            </p>
            <p className="text-xs text-gray-400 line-through">
              {currency}{product.price}
            </p>
          </div>

          {/* Cart Button */}
          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="bg-[#fce7e7] text-[#b84f4f] text-xs px-3 py-1 rounded-full hover:bg-[#fbd5d5] font-medium flex items-center gap-1"
              >
                <img src={assets.cart_icon} alt="cart" className="w-3.5" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#fddada] px-2 py-1 rounded-full text-[#b84f4f] text-sm">
                <button onClick={() => removeFromCart(product._id)}>-</button>
                <span className="font-medium">{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
