import express from "express";
import trimRequest from "trim-request";
import { isActiveUser } from '../middlewares/isActiveUser.js';
import controller from '../controllers/orderController.js';
import validate from "../utils/yupValidations.js";
import schemas from "../validations/orderValidations.js";


const router = express.Router();
router
  .route('/')
  .post(trimRequest.all, isActiveUser, controller.createOrder);

router
  .route('/list')
  .get(trimRequest.all, isActiveUser, controller.getOrderList);

router
  .route('/:orderID')
  .get(trimRequest.all, isActiveUser, controller.getOrderDetail);

router
  .route('/:orderID')
  .post(trimRequest.all, isActiveUser, controller.cancelOrder);

export default router;