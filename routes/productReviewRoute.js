import express from "express";
import trimRequest from "trim-request";
import controller from '../controllers/productReviewController.js';


const router = express.Router();
router
  .route('/')
  .post(trimRequest.all, controller.postProductReview);

router
  .route('/list')
  .get(trimRequest.all, controller.getProductReviewList);

export default router;