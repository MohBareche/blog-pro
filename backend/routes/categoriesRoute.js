import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getAllCategoriesCtrl,
} from "../controllers/categoriesController.js";
const router = express.Router();

// /api/categories
router
  .route("/")
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

export default router;
