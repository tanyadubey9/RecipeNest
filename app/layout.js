import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "RecipeNest",
  description: "Where flavors find a home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#311201] via-[#422814] to-[#632531]">
        <SessionWrapper>
          <Navbar/>
        {children}
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
