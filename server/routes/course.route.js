import express from "express";
import isAuthenticated from "../middlewares/isAuthanticated.js";
import upload from "../utils/multer.js";
import {
  createCourse,
  removeCourse,
  searchCourse,
  getPublishedCourse,
  getCreatorCourses,
  editCourse,
  getCourseById,
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishCourse,
} from "../controller/course.controller.js";

const router = express.Router();

// Course Routes
router.post("/", isAuthenticated, createCourse);
router.get("/", isAuthenticated, getCreatorCourses);
router.get("/search", isAuthenticated, searchCourse);
router.get("/published-courses", getPublishedCourse);
router.get("/:courseId", isAuthenticated, getCourseById);
router.put(
  "/:courseId",
  isAuthenticated,
  upload.single("courseThumbnail"),
  editCourse
);
router.delete("/:courseId", isAuthenticated, removeCourse);
router.patch("/:courseId", isAuthenticated, togglePublishCourse);

// Lecture Routes
router.post("/:courseId/lecture", isAuthenticated, createLecture);
router.get("/:courseId/lecture", isAuthenticated, getCourseLecture);
router.post("/:courseId/lecture/:lectureId", isAuthenticated, editLecture);
router.get("/lecture/:lectureId", isAuthenticated, getLectureById);
router.delete("/lecture/:lectureId", isAuthenticated, removeLecture);

export default router;
