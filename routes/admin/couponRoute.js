import express from 'express'
import trimRequest from "trim-request";
import { isStaffUser } from "../../middlewares/isStaffUser.js";
import couponAdminController from '../../controllers/couponAdminController.js';
import validate from "../../utils/yupValidations.js";
import schemas from '../../validations/couponValidation.js';
import { trim } from 'lodash';

const router = express.Router()

router.route("/").post(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), couponAdminController.createCoupon
);

router.route("/list").get(
    trimRequest.all, isStaffUser, couponAdminController.getCouponList
);

router.route("/:id").get(
    trimRequest.all, isStaffUser, couponAdminController.getDetailCoupon
);

router.route("/:id").put(
    trimRequest.all, isStaffUser, couponAdminController.updateCoupon
);

router.route(":/type/checking").get(
    trimRequest.all, isStaffUser, couponAdminController.checkCoupon
);

router.route(":/id").delete(
    trimRequest.all, isStaffUser, couponAdminController.deleteCoupon
);


export default router