import express from 'express'
import trimRequest from "trim-request";
import { isStaffUser } from "../../middlewares/isStaffUser.js";
import Controller from '../../controllers/couponAdminController.js';
import validate from "../../utils/yupValidations.js";
import schemas from '../../validations/couponValidation.js';

const router = express.Router()

router
    .route("/")
    .post(trimRequest.all, isStaffUser, validate(schemas.createSchema), Controller.createCoupon
        );
        // trimRequest.all, isStaffUser, validate(schemas.createSchema), couponAdminController.createCoupon
    

router
.route("/list").get(
    trimRequest.all, isStaffUser,validate(schemas.createSchema), Controller.getCouponList
);

router
.route("/:id").get(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), Controller.getDetailCoupon
);

router
.route("/:id").put(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), Controller.updateCoupon
);

router
.route("/:type/checking").get(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), Controller.checkCoupon
);

router
.route("/:id").delete(
    trimRequest.all, isStaffUser, validate(schemas.createSchema), Controller.deleteCoupon
); 


export default router