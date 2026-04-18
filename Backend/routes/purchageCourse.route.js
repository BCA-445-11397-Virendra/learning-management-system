import express from "express";
const router = express.Router();
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createCheckOutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  stripeWebhook,
} from "../controllers/purchageCourse.controller.js";

router
  .route("/checkout/create-chekout-session")
  .post(isAuthenticated, createCheckOutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
