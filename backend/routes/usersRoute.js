import express from "express";
const router = express.Router();
import {
  deleteUserProfileCtrl,
  getAllUsersCtrl,
  getUserProfileCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
  updateUserProfileCtrl,
} from "../controllers/usersController.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
} from "../middlewares/verifyToken.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import photoUpload from "../middlewares/photoUpload.js";

// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

export default router;
