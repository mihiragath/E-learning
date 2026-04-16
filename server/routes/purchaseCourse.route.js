import express from "express";
import isAuthenticated from "../middlewares/isAuthanticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  getInstructorDashboardData,
  getMyLearningCourses,
  stripeWebhook,
} from "../controller/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/my-learning").get(isAuthenticated, getMyLearningCourses);
router.route("/dashboard").get(isAuthenticated, getInstructorDashboardData);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
