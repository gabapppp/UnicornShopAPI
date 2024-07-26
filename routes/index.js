import express from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import orderRoute from './orderRoute.js';
<<<<<<< HEAD
import paymentRoute from './paymentRoute.js';
import productRoute from './productRoute.js';
=======

>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
import adminRoute from './admin/index.js';
const router = express.Router();
/***
 * @openapi
 * /v1/status:
 *  get:
 *    description: Responds if the app is up and running
 *    tags:
 *      - Status
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            type: json
 *            example:
 *              status: 'ok'
 *              processEnv: 'development'
 *              CURRENT_PROJECT: 'UnicornShopAPI'
 *  
 */
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    processEnv: process.env.NODE_ENV || 'not set',
    CURRENT_PROJECT: process.env.CURRENT_PROJECT,
  });
});


router.use('/auth', authRoute); //add routes
router.use('/user', userRoute);
router.use('/order', orderRoute);
<<<<<<< HEAD
router.use('/payment', paymentRoute);
router.use('/product', productRoute);
=======

>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")


router.use('/admin', adminRoute);
export default router;
