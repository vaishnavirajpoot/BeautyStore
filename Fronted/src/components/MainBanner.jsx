import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../greencart_assets/assets';

const MainBanner = () => {
  return (
    <div className="relative w-full overflow-hidden mb-3">
      {/* Banner Image */}
      <img
        src={assets.Makeup}
        alt="beauty banner"
        className="w-full rounded-[10px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-pink-100/40 to-transparent flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-24 text-center sm:text-left space-y-4 sm:space-y-5">
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-[#5e3b3b] leading-snug drop-shadow-md">
          Glow Up<br className="hidden sm:block" />
          With Every Swipe ✨
        </h1>

        <p className="text-gray-700 text-sm sm:text-base md:text-xl max-w-xs sm:max-w-sm md:max-w-lg">
          Your one-stop beauty destination — skincare, makeup, and self-love essentials curated for you 💄
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <Link
            to="/products"
            className="px-6 py-2 sm:px-7 sm:py-3 text-white bg-[#5e3b3b] rounded-full text-sm sm:text-base font-medium shadow-md transition-all"
          >
            Shop Now →
          </Link>

          <Link
            to="/products"
            className="px-6 py-2 sm:px-7 sm:py-3 text-[#5e3b3b] font-semibold text-sm sm:text-base transition-all"
          >
            Explore Looks →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
