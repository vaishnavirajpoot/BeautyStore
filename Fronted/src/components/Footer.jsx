import React from "react";
import { assets, footerLinks } from "../greencart_assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-[#fceeea] text-[#5a4a42]">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-[#d8b7b7]">
        {/* Brand Info */}
        <div>
          <img className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="max-w-md mt-6 text-sm md:text-base leading-relaxed text-[#6f4e37]/80">
            We bring you the best in beauty — perfumes, skincare, and more.
            Trusted by thousands of glam lovers, we make beauty effortless and elegant.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[#3b2f2f] mb-3 md:mb-5 text-base md:text-lg">
                {section.title}
              </h3>
              <ul className="space-y-1 text-sm text-[#7a5c52]">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:underline hover:text-[#c98c91] transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="py-4 text-center text-xs md:text-sm text-[#a98b82] tracking-wide">
        © {new Date().getFullYear()} GlowCart. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
