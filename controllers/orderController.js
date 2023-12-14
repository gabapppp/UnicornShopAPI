import {
    createNewOrder, OrderList, OrderDetail
    //fetchOrderList, fetchOrderDetail, updateOrder 
} from "../services/orderService.js";

const createOrder = async (req, res, next) => {
    const { phone, address, item } = req.body;
    try {

        const newOrder = await createNewOrder({
            phone: phone,
            address: address,
        });
        res.json({ "none": "none" });
    }
    catch (error) {
        next(error);
    }
};

const getOrderDetail = async (req, res, next) => {
    const { orderID } = req.params;
    try {
        const order = await OrderDetail(orderID);
        res.json(order);
    }
    catch (e) {
        next(e);
    }
};

const getOrderList = async (req, res, next) => {
    try {
        const orderList = await OrderList();

        res.json(orderList);
    }
    catch (e) {
        next(e);
    }
};

// const updateProduct = async (req, res, next) => {
//     try {

//     }
//     catch (e) {
//         next(e);
//     }
// };

export default {
    createOrder, getOrderDetail, getOrderList
}