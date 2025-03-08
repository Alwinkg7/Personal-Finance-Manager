import express from "express";
import { deleteUser, registerUser, loginUser, updateUser } from "../controllers/authController.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Delete User (Use `:id` in params)
router.delete("/delete/:id", deleteUser);

// Update User (Use `:id` in params)
router.put("/update/:id", updateUser);

export default router;
