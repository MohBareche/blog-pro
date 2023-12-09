import express from "express";
const router = express.Router();
import photoUpload from "../middlewares/photoUpload.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";
import {
  createPostCtrl,
  deletePostCtrl,
  getAllPostsCtrl,
  getPostCountCtrl,
  getSinglePostCtrl,
  toggleLikeCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
} from "../controllers/postsController.js";
import validateObjectId from "../middlewares/validateObjectId.js";

//  /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

// /api/posts/update-image/:id
router
  .route("/upload-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

export default router;
