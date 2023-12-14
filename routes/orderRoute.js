import express from "express";
import trimRequest from "trim-request";
import { isActiveUser } from '../middlewares/isActiveUser.js';
import controller from '../controllers/orderController.js';
import validate from "../utils/yupValidations.js";
import schemas from "../validations/orderValidations.js";


const router = express.Router();
router
  .route('/order')
  .post(trimRequest.all, isActiveUser, controller.createOrder, validate(schemas.createSchema) );

router
  .route('/order')
  .get(trimRequest.all, isActiveUser, controller.getOrderList, validate(schemas.listSchema) );

router
  .route('/oder')
  .get(trimRequest.all, isActiveUser, controller.getOrderDetail, validate(schemas.detailSchema) );

export default router;