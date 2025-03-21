import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getNetProfitLoss,
  updateTransaction,
  getTransactionsByPeriod,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Named import

const router = express.Router();

router.post("/add", protect, addTransaction); // Add transaction
router.get("/", protect, getTransactions); // Get user transactions
router.delete("/:id", protect, deleteTransaction); // Delete transaction
router.get("/profit-loss", protect, getNetProfitLoss);
router.put("/:id", protect, updateTransaction); // Update transaction
router.get("/by-period", protect, getTransactionsByPeriod);

export default router;
