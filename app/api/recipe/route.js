import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Recipe from "@/models/Recipe";

export async function GET(req) {
    try {
      await connectDB(); // Ensure DB connection
  
      const recipes = await Recipe.find(); // Fetch all recipes
  
      return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch recipes", error: error.message }, { status: 500 });
    }
  }
  

export async function POST(req) {
  try {
    await connectDB(); // Ensure MongoDB is connected

    const body = await req.json(); // Parse incoming JSON data

    const newRecipe = new Recipe({
      username: body.username, // Ensure this matches the field in the schema
      name: body.name,
      image: body.image,
      ingredients: body.ingredients.split(","), // Convert comma-separated string to an array
      instructions: body.instructions,
      date: new Date(body.date), // Convert date to proper format
    });

    await newRecipe.save(); // Save the recipe to the database

    return NextResponse.json({ message: "Recipe posted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to post recipe", error: error.message }, { status: 500 });
  }
}

