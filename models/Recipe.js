import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Changed from String to ObjectId
  date: { type: Date, default: Date.now }, // Automatically assigns the date
}, { timestamps: true });

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
