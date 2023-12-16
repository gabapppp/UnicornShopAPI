import express from 'express'
import adminController from '../controllers/couponAdminController.js';
import controller from '../../controllers/authAdminController.js';
import trimRequest from 'trim-request';
import schemas from '../../validations/authValidations.js';

const router = express.Router()


router
    .route('/login')
    .post(trimRequest.all, validate(schemas.loginSchema), controller.login);

router
    .route('/logout')
    .post(trimRequest.all, validate(schemas.logoutSchema), controller.logout);

router
    .route('/refresh-token')
    .post(trimRequest.all, validate(schemas.refreshTokenSchema), controller.refreshToken);

// coupon admin routes
router
    .route('/admin/coupons')
    .post(adminController.createCoupon)
    .get(adminController.getAllCoupons);

router
    .route('/admin/coupons/:id')
    .get(adminController.getCoupon)
    .put(adminController.updateCoupon)
    .delete(adminController.deleteCoupon);

// coupon user routes
router
    .route('/coupons/apply')
    .post(controller.applyCoupon);

router
    .route('/coupons/validate')
    .post(controller.validateCoupon);

export default router