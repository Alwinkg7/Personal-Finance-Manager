import express from "express";
import { addBudget, updateBudget, deleteBudget, getBudgets } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, addBudget);
router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);
router.get("/", protect, getBudgets);

export default router;
// end of budgetRoutes.js