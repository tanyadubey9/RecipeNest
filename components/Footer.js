import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#9e0059] md:p-5 p-3 text-white relative w-full bottom-0">
      <div className="container md:px-6 px-3 grid grid-cols-3 md:grid-cols-3 gap-6">
        <div>
          <h2 className="md:text-lg text-xs font-semibold mb-2">About RecipeNest</h2>
          <p className="md:text-sm text-[8px]">
            Find simple and tasty recipes to try. Share your dishes with others!
          </p>
        </div>

        <div>
          <h2 className="md:text-lg text-xs font-semibold mb-2">Quick Links</h2>
          <ul className="md:text-sm text-[8px] md:space-y-2 space-y-1">
            <li>
              <Link href="/dashboard" className="hover:text-white hover:underline">Explore Recipes</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white hover:underline">Upload Recipe</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
    
        <div>
          <h2 className="md:text-lg text-xs font-semibold mb-2">Legal</h2>
          <ul className="md:text-sm text-[8px] md:space-y-2 space-y-1">
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white hover:underline">Terms of Use</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="md:mt-6 mt-3 text-center text-[#b4b4b4] md:text-sm text-xs">
        &copy; {new Date().getFullYear()} RecipeNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
