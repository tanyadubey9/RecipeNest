'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import JoinCommunity from "../components/JoinCommunity";

export default function Home() {

  return (
    <>
      <section>
        <div className="relative -z-10 w-full">
          <div className="cover-pic md:h-[70vh] h-[60vh] min-h-[700px]">
            <div className="bg-[#753d25cb] flex justify-center items-center relative h-full">
              <div className="text-white flex flex-col gap-4 justify-center items-center">
                <span className="md:text-4xl text-2xl font-bold w-full text-center">
                  <h1 className="typewriter">Welcome To RecipeNest!</h1>
                </span>
                <span className="md:text-2xl text-xl text-center w-full font-semibold">
                  <h5 className="typewriter2">Where Flavors Find a Home!</h5>
                </span>
                <p className="md:text-lg text-sm text-center">Discover, Cook, and Savor! Find the best recipes tailored to your taste</p>

              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-[#2c1402] relative -z-30"></div>

        <div className="bg-gradient-to-b from-[#311201] via-[#422814] to-[#632531] flex flex-col justify-center items-center">
          <div className="flex justify-around items-center md:p-4 p-2 border-b-2 border-[#2c1402] my-5 md:max-h-[70vh] max-h-[55vh] md:min-h-96 min-h-72 gap-1">
              <Image src="/dish1.png" alt="dish1" width={180} height={180} className="md:w-[18rem] border border-[#9a725d] rounded-xl" />
            <div className="w-3/5 md:p-3 p-1 md:my-3 my-1">
              <h4 className="md:text-xl text-sm bg-[#e3c7ab] text-[#2b1201] font-bold">• Discover Delicious Recipes</h4>
              <p className="md:text-lg text-xs my-2 font-semibold text-[#dbdad8]">Explore a vast collection of mouthwatering recipes, from quick snacks to gourmet meals. Each recipe comes with easy-to-follow instructions, ingredient lists, and cooking tips to ensure a hassle-free experience in the kitchen. Start exploring today and make every meal an unforgettable experience! 🍽️
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center md:p-4 p-2 border-b-2 border-[#2c1402] my-5 md:max-h-[70vh] max-h-[55vh] md:min-h-96 min-h-72 gap-1">
            <div className="w-3/5 md:p-3 p-1 md:my-3 my-1">
              <h4 className="md:text-xl text-sm bg-[#e3c7ab] text-[#2b1201] font-bold">• Share Your Own Recipes</h4>
              <p className="md:text-lg text-xs my-2 font-semibold text-[#dbdad8]">Have a special recipe to share? Upload your favorite dishes with ingredients, instructions, and images to inspire fellow food lovers. Connect with a community that appreciates your culinary creativity!</p>
              <div className="text-center">
                <Link href="/login">
                  <button className="border md:p-1.5 p-1 m-2 text-[#e3c7ab] bg-orange-950 md:rounded-lg rounded text-xs md:text-base">Submit Recipes</button>
                </Link>
              </div>
            </div>
            <Image src="/dish2.png" alt="dish1" width={180} height={180} className="md:w-[18rem] border border-[#9a725d] rounded-xl" />
          </div>
          <div className="flex justify-around items-center md:p-4 p-2 border-b-2 border-[#2c1402] my-5 md:max-h-[70vh] max-h-[55vh] md:min-h-96 min-h-72 gap-1">
            <Image src="/dish3.png" alt="dish1" width={180} height={180} className="md:w-[18rem] border border-[#9a725d] rounded-xl" />
            <div className="w-3/5 md:p-3 p-1 md:my-3 my-1">
              <h4 className="md:text-xl text-sm bg-[#e3c7ab] text-[#2b1201] font-bold">• Smart Recipe Search</h4>
              <p className="md:text-lg text-xs my-2 font-semibold text-[#dbdad8]">Looking for a specific dish or ingredient? Never run out of meal ideas again! Finding the perfect recipe has never been easier! Simply enter an ingredient, country, or dish name, and get instant results tailored to your needs.
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center md:p-4 p-2 border-b-2 border-[#2c1402] my-5 md:max-h-[70vh] max-h-[55vh] md:min-h-96 min-h-72 gap-1">
            <div className="w-3/5 md:p-3 p-1 md:my-3 my-1">
              <h4 className="md:text-xl text-sm bg-[#e3c7ab] text-[#2b1201] font-bold">• Save Favorite Recipes</h4>
              <p className="md:text-lg text-xs my-2 font-semibold text-[#dbdad8]">Found a recipe you love? With our Save Recipe feature, you can easily bookmark your favorite dishes and access them anytime. No need to search again—just save and revisit whenever you&apos;re ready to cook! Start building your personal recipe collection today.</p>
            </div>
            <Image src="/dish4.png" alt="dish1" width={180} height={180} className="md:w-[18rem] border border-[#9a725d] rounded-xl" />
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[#632531] via-[#422814] to-[#311201] flex flex-col justify-center items-center">
        <div className="my-10">
          <JoinCommunity />
        </div>
      </section>
    </>
  );
}   
