import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3 mt-24 pb-16 px-4">
      <h1 className="md:text-4xl text-2xl font-semibold text-[#4b3f36]">
        Never Miss a Glow-up!
      </h1>
      <p className="md:text-lg text-sm text-[#6f4e37] opacity-70 max-w-xl">
        Subscribe for exclusive beauty drops, new arrivals, and member-only perks.
      </p>

      <form className="flex items-stretch justify-between max-w-2xl w-full h-12 md:h-14 mt-3">
        <input
          className="border border-[#e4cfc7] bg-[#fff9f8] text-sm md:text-base text-[#4b3f36] placeholder-[#b59c94] px-4 w-full outline-none rounded-l-full"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="px-6 md:px-10 bg-[#d19fa3] hover:bg-[#c98c91] text-white font-medium text-sm md:text-base transition rounded-r-full"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
