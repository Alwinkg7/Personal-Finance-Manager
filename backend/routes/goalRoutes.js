import express from "express";
import { addGoal, deleteGoal, getGoals, updateGoal } from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, addGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);
router.get("/", protect, getGoals);

export default router;