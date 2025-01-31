const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type: String }, // Image URL (uploaded images will be stored in /uploads)
    createdBy: { type: String, default: "Anonymous" }, // Future user feature
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
