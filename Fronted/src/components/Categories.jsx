import React from 'react';
import { categories } from '../greencart_assets/assets';
import { useAppContext } from '../context/Appcontext';

const Categories = () => {
  const { navigate } = useAppContext();
  const [stopScroll, setStopScroll] = React.useState(false);

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="overflow-hidden w-full py-14 bg-[#f6eaea]"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#5a3b3b] uppercase">
            Categories
          </h1>
          <div className="w-24 h-1 mt-2 bg-[#5a3b3b] mx-auto rounded-full" />
        </div>

        {/* Scrollable Cards */}
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? 'paused' : 'running',
            animationDuration: categories.length * 2500 + 'ms',
          }}
        >
          <div className="flex gap-6 px-6">
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  navigate(`/products/${category.path.toLowerCase()}`);
                  scrollTo(0, 0);
                }}
              >
                <div className="w-60 h-60 relative group rounded-full overflow-hidden shadow-xl transition-transform duration-300 transform hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold text-center tracking-wide">
                      {category.text}
                    </p>
                  </div>
                </div>
                {/* Label Below */}
                <p className="mt-2 text-sm md:text-base font-semibold text-[#5a3b3b] underline underline-offset-4">
                  {category.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
