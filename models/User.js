import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  profilepic: { type: String },
  coverpic: { type: String },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
}, { timestamps: true });

UserSchema.index({ email: 1, username: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
