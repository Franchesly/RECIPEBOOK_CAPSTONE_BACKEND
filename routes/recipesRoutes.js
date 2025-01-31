const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe");
const recipeSeedData = require('../data/seed.json');

// Seeding Recipes
router.get('/seed', async (req, res) => {
  try {
    await Recipe.deleteMany();
    console.log('Deleted all existing activities.');
    console.log('Seed Data:', recipeSeedData);
    await Recipe.insertMany(recipeSeedData);
    res.status(200).send('Recipe seeding completed!');
  }
  catch (error) {
    res.status(500).send(`Error seeding users: ${error.message}`);
  }
});

// 📌 GET All Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// 📌 GET Single Recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// 📌 POST (Create) a New Recipe
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions, image, createdBy } = req.body;
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      createdBy,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
});

// 📌 PUT (Update) a Recipe
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
});

// 📌 DELETE a Recipe
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});

module.exports = router;
