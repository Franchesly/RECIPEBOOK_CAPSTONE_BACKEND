require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// import Recipe model
const Recipe = require("./models/recipe");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route Definitions
app.use('/recipes', require('./routes/recipesRoutes.js'));

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Book API!");
});

// //Drop all existing data, then seed
// app.get("/seed/all", async (req, res) => {
//   try {
//       await Promise.all([
//           Recipe.deleteMany({})
//       ]);
//   } catch (e) {
//       console.log(`Something went wrong loading seed data: ${e.message}`);
//   }
// })

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
