import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthanticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;
