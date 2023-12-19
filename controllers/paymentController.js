import { fetchOrderByID, fetchOrderItemByOrderID } from "../services/orderService.js";
import { createPayment } from "../services/paymentService.js";

const createNewPayment = async (req, res, next) => {
    const { orderID, couponCode } = req.body;
    const userId = req.authData.userId;
    try {
        const orderItems = await fetchOrderItemByOrderID(orderID, userId);
        const newPayment = await createPayment(orderID, orderItems, couponCode);
        res.json(newPayment);
    } catch (e) {
        next(e);
    }
};

export default {
    createNewPayment
}