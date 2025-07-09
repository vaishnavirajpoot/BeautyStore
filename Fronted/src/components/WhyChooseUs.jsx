import React, { useEffect, useState } from "react";
import { Heart, Users, Building } from "lucide-react";
import { assets } from "../greencart_assets/assets";

const BoxSlides = [
  assets.AllMakeup,
  assets.Pic2,
  assets.Pic3,
  assets.Pic5
];

const WhyChooseUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("slide-out");

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % BoxSlides.length);
        setSlideDirection("slide-in");
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#f6eaea] via-rose-50 to-pink-100  md:px-4 py-4 gap-4 md:gap-4">

  {/* LEFT SIDE - IMAGE BLOCK */}
  <div className="w-full md:w-[60%] flex items-center justify-center pt-4 relative h-[55vh] md:h-[560px]">
    <div className="w-[90%] h-full md:w-[80%] md:h-[80%] rounded-xl overflow-hidden shadow-xl relative">
      <img
        src={BoxSlides[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
      />
    </div>
  </div>

  {/* RIGHT SIDE - TEXT BLOCK */}
  <div className="w-full md:w-[40%] space-y-8 text-center md:text-left px-2 md:px-0">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-[#5e3b3b] leading-snug">Why Choose Us?</h2>
      <p className="text-[#746c6c] text-sm mt-1 ml-6">Your glow, our commitment 💖</p>
    </div>

<div className="flex items-start gap-4">
  <Users className="text-[#5e3b3b]" size={26} />
  <div>
    <h3 className="text-base font-semibold text-[#5e3b3b]">Top-Notch Quality, Always</h3>
    <p className="text-sm text-gray-600">Handpicked beauty essentials from skincare to haircare, tested for quality and trust.</p>
  </div>
</div>

<div className="flex items-start gap-4">
  <Heart className="text-[#5e3b3b]" size={26} />
  <div>
    <h3 className="text-base font-semibold text-[#5e3b3b]">Beauty That Fits Your Budget</h3>
    <p className="text-sm text-gray-600">Affordable prices on all categories — because glowing skin & style shouldn’t cost a fortune.</p>
  </div>
</div>

<div className="flex items-start gap-4">
  <Building className="text-[#5e3b3b]" size={26} />
  <div>
    <h3 className="text-base font-semibold text-[#5e3b3b]">Easy Returns, Happy You</h3>
    <p className="text-sm text-gray-600">Not satisfied? Hassle-free return & replacement policy that puts you first.</p>
  </div>
</div>

  </div>
</div>

  );
};

export default WhyChooseUs;
