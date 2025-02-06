const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/recipes', require('./routes/recipesRoutes'));

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Book!");
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});