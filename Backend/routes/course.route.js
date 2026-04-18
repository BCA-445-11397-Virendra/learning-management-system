import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseDetailsbyId,
  getCourseLectures,
  getCouserById,
  getCreatorCourse,
  getLectureById,
  getPublishCourse,
  removeCourse,
  removeLecture,
  searchCourse,
  togglePublishCourse,
  updateLecture,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/").get(isAuthenticated, getCreatorCourse);
router.route("/:courseId").put(isAuthenticated, upload.single("thumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCouserById);
router.route("/courses/:courseId").delete(isAuthenticated, removeCourse);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLectures);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, updateLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
router.route("/published/courses").get(getPublishCourse);
router.route("/course/details/:courseId").get(isAuthenticated, getCourseDetailsbyId);

export default router;
