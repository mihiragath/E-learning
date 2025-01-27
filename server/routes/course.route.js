import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  removeLecture,
  togglePublishCourse,
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
router.route("/:courseId/lecture").get(isAuthanticated, getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthanticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthanticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthanticated, getLectureById);
router.route("/:courseId").patch(isAuthanticated, togglePublishCourse);

export default router;
