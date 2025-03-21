import express from "express";
import { getFinancialAdvice } from "../controllers/financialAdviceController.js";

const router = express.Router();

// Route to fetch AI-generated financial advice
router.post("/financial-advice", getFinancialAdvice);

export default router;