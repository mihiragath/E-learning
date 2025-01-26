import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseById,
  getCreatorCourses,
} from "../controller/course.controller.js";
import isAuthanticated from "../middlewares/isAuthanticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthanticated, createCourse);
router.route("/").get(isAuthanticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthanticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthanticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthanticated, createLecture);
export default router;
