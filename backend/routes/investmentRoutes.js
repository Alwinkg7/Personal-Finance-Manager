import express from "express";
import { addInvestment, getInvestments } from "../controllers/investmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all investments
router.get("/", protect, getInvestments);

// Add a new investment
router.post("/", protect, addInvestment);

export default router;

