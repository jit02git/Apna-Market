import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Public
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected
router.post("/", requireSignIn, isAdmin, createCategory);
router.put("/:id", requireSignIn, isAdmin, updateCategory);
router.delete("/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
