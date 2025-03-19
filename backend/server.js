import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from "./routes/transactionRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

import mongoose from 'mongoose';


import path from 'path';
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for frontend communication

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use("/api/transactions", transactionRoutes); // Transaction routes
app.use("/api/investments", investmentRoutes); // Investment routes
app.use("/api/goals", goalRoutes); // Goal routes
app.use("/api/budgets", budgetRoutes); // Budget routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist/')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
});
}


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
