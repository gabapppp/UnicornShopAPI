import express from "express";
import trimRequest from "trim-request";
import { isStaffUser } from "../../middlewares/isStaffUser.js";
import controller from "../../controllers/productAdminController.js";
import schemas from "../../validations/productValidations.js";
import validate from "../../utils/yupValidations.js";


const router = express.Router();
router.route("/").post(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), controller.createProduct
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