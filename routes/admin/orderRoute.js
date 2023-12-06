import express from "express";
import trimRequest from "trim-request";
import { isActiveUser } from '../../middlewares/isActiveUser.js';


const router = express.Router();
router
  .route('/order')
  .post(trimRequest.all, isActiveUser );

router
  .route('/order')
  .get(trimRequest.all, isActiveUser );

router
  .route('/oder')
  .get(trimRequest.all, isActiveUser );

export default router;