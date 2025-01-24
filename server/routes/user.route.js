import express from "express";
import {
  register,
  login,
  getUserProfile,
  logout,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthanticated.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/logout").get(logout);

export default router;
