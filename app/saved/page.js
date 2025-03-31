"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(recipes);
  }, []);

  // Remove recipe from saved list
  const removeRecipe = (idMeal) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.idMeal !== idMeal);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-6 min-h-[750px]">
      <h2 className="text-2xl bg-blue-200 p-2 rounded-lg font-semibold text-blue-950 text-center">Saved Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 m-2 rounded-lg">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="border-gray-200 border p-2 shadow-md rounded-md text-center relative">
              <Link href={`/meal/${recipe.idMeal}`}>
                <h3 className="font-semibold py-1 text-lg">{recipe.strMeal}</h3>
                {recipe.strMealThumb && (
                  <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={180} height={180} className="rounded-md mx-auto" />
                )}
              </Link>
              <button
                onClick={() => removeRecipe(recipe.idMeal)}
                className="mt-2 px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500"
              >
                Remove ❌
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">No saved recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
