import express from "express";
import trimRequest from "trim-request";
import controller from '../controllers/productReviewController.js';


const router = express.Router();
router
  .route('/')
  .post(trimRequest.all, controller.postProductReview);
  //.post(trimRequest.all, controller.createProductReview, validate(schemas.createSchema) );

router
  .route('/list')
  .get(trimRequest.all, controller.getProductReviewList);
  //.get(trimRequest.all, controller.getProductReviewList, validate(schemas.listSchema) );

export default router;