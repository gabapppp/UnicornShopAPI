import { OrderModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";

const createNewOrder = async (order) => {
    const newOrder = await OrderModel.create(OrderModel);
    if (!newOrder)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProduct;
};

const OrderList = async (customerID) => {
    const list = await OrderModel.find({ customerID: customerID });
    return list;
};

const OrderDetail = async (orderID) => {

    const order = await OrderModel.findOne(orderID);
    if (!order)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
    return order;
};

export {
    createNewOrder, OrderList, OrderDetail, //updateProduct
}

