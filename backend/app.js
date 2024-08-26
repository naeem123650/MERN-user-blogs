const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

require("dotenv").config();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Catch-all for unmatched routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
