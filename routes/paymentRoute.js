import { Router } from "express";
import trimRequest from "trim-request";
import { isActiveUser } from "../middlewares/isActiveUser.js";
import controller from "../controllers/paymentController.js"

const router = Router();

router.post("/", trimRequest.all, isActiveUser, controller.createNewPayment);

export default router;