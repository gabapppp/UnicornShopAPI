import express from 'express';
import authRoute from './authRoute.js';
import orderRoute from './orderRoute.js';
//import userRoute from './userRoute.js';

const router = express.Router();
/***
 * @openapi
 * /api/admin/status:
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
        isAdmin: true,
        status: 'ok',
        processEnv: process.env.NODE_ENV || 'not set',
        CURRENT_PROJECT: process.env.CURRENT_PROJECT,
    });
});


router.use('/auth', authRoute); //add routes
//router.use('/user', userRoute)

export default router;
