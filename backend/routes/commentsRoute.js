import express from "express";
const router = express.Router();
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";
import {
  createCommentCtrl,
  deleteCommentCtrl,
  getAllCommentsCtrl,
  updateCommentCtrl,
} from "../controllers/commentsController.js";
import validateObjectId from "../middlewares/validateObjectId.js";

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

// /api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, deleteCommentCtrl)
  .put(validateObjectId, verifyToken, updateCommentCtrl);

export default router;
