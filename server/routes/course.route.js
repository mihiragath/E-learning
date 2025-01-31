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
  getPublishedCourse,
  searchCourse,
} from "../controller/course.controller.js";
import isAuthanticated from "../middlewares/isAuthanticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/published-courses").get(getPublishedCourse);

router
  .route("/")
  .post(isAuthanticated, createCourse)
  .get(isAuthanticated, getCreatorCourses);

router
  .route("/:courseId")
  .put(isAuthanticated, upload.single("courseThumbnail"), editCourse)
  .get(isAuthanticated, getCourseById)
  .patch(isAuthanticated, togglePublishCourse);

// Lecture Routes
router
  .route("/:courseId/lecture")
  .post(isAuthanticated, createLecture)
  .get(isAuthanticated, getCourseLecture);

router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthanticated, editLecture);

router
  .route("/lecture/:lectureId")
  .get(isAuthanticated, getLectureById)
  .delete(isAuthanticated, removeLecture);

router.route("/search").get(isAuthanticated, searchCourse);
export default router;
