import { Router } from "express";
import trimRequest from "trim-request";
import controller from "../controllers/productController.js";

const router = Router();

router.route("/").get(
    trimRequest.all, controller.getProductList
);

router.route("/:id").get(
    trimRequest.all, controller.getProductDetail
);

export default router;