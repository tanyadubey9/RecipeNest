"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const PostRecipe = () => {
  const { data: session } = useSession();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeDate, setRecipeDate] = useState(new Date().toISOString().split("T")[0]);
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);

    const newRecipe = {
      username: session?.user?.name || "Anonymous", // Ensure this matches the schema
      name: recipeName,
      ingredients: ingredients, // This will be split in the API
      instructions,
      image: recipeImage,
      date: recipeDate, // Converted in the API
    };

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) throw new Error("Failed to post recipe");

      alert("Recipe posted successfully!");
      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setRecipeImage("");
    } catch (error) {
      console.error("Error posting recipe:", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md shadow-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Post a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={recipeImage}
          onChange={(e) => setRecipeImage(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        {recipeImage && (
          <div className="w-full flex justify-center">
            <Image src={recipeImage} alt="Recipe" width={200} height={150} className="rounded-md" />
          </div>
        )}
        <input
          type="date"
          value={recipeDate}
          onChange={(e) => setRecipeDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={posting}
        >
          {posting ? "Posting..." : "Post Recipe"}
        </button>
      </form>
    </div>
  );
};

export default PostRecipe;
 