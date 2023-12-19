import { OrderModel, OrderItemModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";
import { orderStatus } from "../config/orderStatus.js";

const createNewOrder = async (order) => {
    const newOrder = await OrderModel.create({
        customerRef: order.customer._id,
        username: order.customer.username,
        email: order.customer.email,
        fullname: order.fullname,
        phone: order.phone,
        address: order.address,
    });
    if (!newOrder)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return newOrder;
};

const fetchOrderListByUserID = async (customerID) => {
    const list = await OrderModel.find({ customerID: customerID });
    if (!list)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return list;
};

const fetchOrderByID = async (orderID, userId) => {
    const order = await OrderModel.findOne({ _id: orderID, customerRef: userId });
    console.log(order)
    if (!order)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found");
    return order;
};

const updateOrderStatusToCancel = async (orderID) => {
    const oldOrder = await OrderModel.findById(orderID);
    if (!oldOrder)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found");
    if (oldOrder.status == orderStatus.PENDING) {
        const newOrder = await OrderModel.updateOne({ _id: orderID, status: orderStatus.CANCELED });
        if (!newOrder)
            throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    }
    return
};

const createOrderItem = async (item) => {
    const oldItem = await OrderItemModel.exists({ productID: item.productID, orderID: item.orderID });
    if (oldItem)
        throw new APIError(httpStatus.BAD_REQUEST, "Item found, seems our server needed a break!");
    const newItem = await OrderItemModel.create(item);
    if (!newItem)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return newItem;
};

const fetchOrderItemByOrderID = async (orderID, userId) => {
    const order = await OrderModel.findOne({ _id: orderID, userId });
    if (!order)
        throw new APIError(httpStatus.BAD_REQUEST, "Order not found");
    const listItem = await OrderItemModel.find({ orderID: orderID });
    return listItem;
}

const fetchFirstOrderItem = async (orderID) => {
    const order = await OrderModel.findById(orderID);
    if (!order)
        throw new APIError(httpStatus.BAD_REQUEST, "Order not found");
    const firstItem = await OrderItemModel.findOne(order);
    return firstItem;
}
export {
    createNewOrder,
    fetchOrderByID,
    fetchOrderListByUserID,
    updateOrderStatusToCancel,
    createOrderItem,
    fetchOrderItemByOrderID,
    fetchFirstOrderItem
}