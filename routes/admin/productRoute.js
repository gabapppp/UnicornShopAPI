import express from "express";
import trimRequest from "trim-request";
import { isStaffUser } from "../../middlewares/isStaffUser.js";
import controller from "../../controllers/productAdminController.js";


const router = express.Router();
router.route("/").post(
    trimRequest.all, isStaffUser, controller.createProduct
);

router.route("/list").get(
    trimRequest.all, isStaffUser, controller.getProductList
);


router.route("/:id").get(
    trimRequest.all, isStaffUser, controller.getProductDetail
);

router.route("/:id").put(
    trimRequest.all, isStaffUser, controller.updateProduct
);


export default router;