"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]); // ✅ Initialize as an empty array
  const [searchCategory, setSearchCategory] = useState("country");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchRecipes = useCallback(async () => {
    let apiUrl = "";

    if (searchCategory === "country") {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchTerm || "Indian"}`;
    } else if (searchCategory === "material") {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
    } else if (searchCategory === "recipe") {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.meals) {
        setRecipes([]);  // ✅ Ensure it's always an array
        return;
      }

      setRecipes(data.meals);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRecipes([]);  // ✅ Set a fallback empty array
    }
  }, [searchCategory, searchTerm]);
  
  useEffect(() => {
    fetchRecipes();
}, [fetchRecipes]);  // ✅ Now it updates when `searchCategory` or `searchTerm` changes

useEffect(() => {
    fetchCategories();
}, []);


  const fetchCategories = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();

      if (data && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchRecipesByCategory = async (category) => {
    setSelectedCategory(category); // Update selected category

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();

      if (data && data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]); // If no recipes found
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
    {/* Hamburger Button */}
    <button
      className="absolute p-2 z-50 md:hidden"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <Image
        src={isSidebarOpen ? "/close.png" : "/hamburger.png"}
        alt="menu toggle"
        width={20}
        height={20}
      />
    </button>

    {/* Sidebar */}
    <aside
      className={`fixed md:relative h-full w-64 bg-white p-6 shadow-md transition-transform md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:block`}
    >
      {session ? ( 
        <h2 className="text-2xl font-semibold my-5">Welcome, {session.user.name} 👋</h2>
      ) : (
        <h2 className="text-xl font-semibold my-5">Welcome, Guest 👋</h2>
      )}
      <ul className="flex flex-col gap-2">
        <li className="bg-blue-100 p-1 rounded-lg">
          <h2 className="text-xl font-semibold">Categories</h2>
        </li>
        <li>
          <ul className="flex flex-col gap-1 p-1">
            {categories.map((category) => (
              <li
                key={category.idCategory}
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => fetchRecipesByCategory(category.strCategory)}
              >
                {category.strCategory}
              </li>
            ))}
          </ul>
        </li>
        <li className="bg-blue-100 p-1 rounded-lg">
          <Link href="/saved">
            <h2 className="text-xl font-semibold cursor-pointer hover:text-yellow-500">Save Recipe</h2>
          </Link>
        </li>
      </ul>
    </aside>

    {/* Main Content */}
    <main className="flex-1 md:p-6 p-3">
      <div className="flex justify-center items-center mb-2 md:mb-4 mt-4">
        <select
          className="bg-[#d42287] text-white md:px-4 px-2 md:py-2 py-1 rounded-lg md:ml-2 hover:bg-[#9e0059] shadow-lg text-sm md:text-base"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="country">By Country</option>
          <option value="material">By Material</option>
          <option value="recipe">By Recipe Name</option>
        </select>

        <input
          type="search"
          placeholder={`Search by ${searchCategory}`}
          className="border-2 md:p-2 p-1 rounded-lg md:w-1/3 w-1/2 ml-2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="bg-[#d42287] text-white md:px-4 px-2 md:py-2 py-1 rounded-lg ml-2 hover:bg-[#9e0059] text-sm md:text-base" onClick={fetchRecipes}>
          Search
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Recipe Dashboard</h1>

      <div className="grid 2xl:grid-cols-4 grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.idMeal} href={`/meal/${recipe.idMeal}`}>
              <div className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition">
                <h3 className="sm:text-lg text-sm font-semibold mb-2">{recipe.strMeal}</h3>
                <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={400} height={400} className="w-full 2xl:h-64 md:h-60 object-cover rounded-md mb-2" />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-700">No recipes found.</p>
        )}
      </div>
    </main>
  </div>
);
};

export default Dashboard;

