"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth
import Image from "next/image";

const MealDetail = () => {
  const { data: session } = useSession(); // Get user session
  const { id } = useParams(); // ✅ Correct way in App Router
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Fetch meal details
  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => setMeal(data.meals ? data.meals[0] : null))
        .catch((error) => console.error("Error fetching meal details:", error));
    }

    // Load saved recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedRecipes);
  }, [id]);

  // Check if meal is already saved
  const isSaved = savedRecipes.some((saved) => saved.idMeal === meal?.idMeal);

  // Save or remove recipe
  const toggleSaveRecipe = () => {
    let updatedRecipes;
    if (isSaved) {
      updatedRecipes = savedRecipes.filter((r) => r.idMeal !== meal.idMeal); // Remove recipe
    } else {
      updatedRecipes = [...savedRecipes, meal]; // Save recipe
    }

    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  if (!meal) {
    return <div className="text-center text-xl font-semibold mt-10 text-white">Loading meal details...</div>;
  }

  // Extract ingredients dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 my-4 min-h-[750px]">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <Image src={meal.strMealThumb} alt={meal.strMeal} width={400} height={400} className="w-full h-80 object-cover rounded-lg mb-4" />

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc ml-6 mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <p className="text-gray-700 leading-relaxed">{meal.strInstructions}</p>

      <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-4 block text-blue-600 hover:underline">
        Watch Tutorial on YouTube 🎥
      </a>

      <div className="mt-4">
        <button onClick={() => router.back()} className="mx-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Go Back
        </button>
        <button
          onClick={toggleSaveRecipe}
          className={`mx-1 px-4 py-2 rounded-lg ${isSaved ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          {isSaved ? "Saved" : "Save Recipe"}
        </button>
      </div>
    </div>
  );
};

export default MealDetail;
