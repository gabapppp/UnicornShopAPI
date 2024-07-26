<<<<<<< HEAD
import {
    createNewOrder,
    //fetchOrderList, fetchOrderDetail, updateOrder 
} from "../services/orderService.js";
import { createPayment } from "../services/paymentService.js";

const createOrder = async (req, res, next) => {
    const { name, color, image, category, department, size, description, price, stock } = req.body;
    try {
        const newProduct = await createNewProduct({
            name: name,
            color: color,
            image: image,
            category: category,
            department: department,
            size: size,
            description: description,
            price: price,
            stock: stock
=======
import { orderStatus } from "../config/orderStatus.js";
import { getUserFromId } from '../services/userService.js';
import { fetchProductDetail, descreaseProductStockByID } from "../services/productService.js";
import {
    createNewOrder, fetchOrderListByUserID, fetchOrderByID, updateOrderStatusToCancel, createOrderItem, fetchOrderItemByOrderID, fetchFirstOrderItem
} from "../services/orderService.js";

const createOrder = async (req, res, next) => {
    const userId = req.authData.userId;
    const { fullname, phone, address, items } = req.body;
    try {
        let newOrderItemList = []
        let itemCnt = 0;
        const user = await getUserFromId(userId);
        const newOrder = await createNewOrder({
            customer: user,
            fullname: fullname,
            phone: phone,
            address: address,
        });
        items.forEach(async (element) => {
            const product = await fetchProductDetail(element.productID);
            const newOrderItem = await createOrderItem({
                orderID: newOrder._id,
                productID: product.productID,
                productName: product.name,
                productPrice: product.price,
                qty: element.qty
            });
            itemCnt += element.qty;
            descreaseProductStockByID(element.productID, element.qty);
            newOrderItemList.push(newOrderItem);
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
        });
        res.json({
            orderID: newOrder._id,
            customerName: user.fullname,
            customerPhone: phone,
            customerAddress: address,
            status: newOrder.status,
            itemList: newOrderItemList,
            itemCnt: itemCnt,
            createAt: newOrder.createdAt
        });
    }
    catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
const getProductDetail = async (req, res, next) => {
    try {

=======
const getOrderDetail = async (req, res, next) => {
    const userId = req.authData.userId;
    const { orderID } = req.params;
    try {
        const order = await fetchOrderByID(orderID);
        console.log(order)
        if (userId != order.customerRef)
            res.json({ messgae: "order not found" });
        else {
            const itemList = await fetchOrderItemByOrderID(orderID);
            if (order.status == orderStatus.PENDING) {
                res.json({
                    orderID: order._id,
                    username: order.username,
                    phone: order.phone,
                    address: order.address,
                    status: order.status,
                    itemList: itemList,
                    createAt: order.createdAt
                });
            }
            else {
                const payment = await fetchPaymentDetailByOrderID(orderID);
                res.json({
                    orderID: order._id,
                    customerName: order.customer.fullname,
                    customerPhone: order.customerPhone,
                    customerAddress: order.customerAddress,
                    status: order.status,
                    itemList: itemList,
                    amount: payment.amount,
                    createAt: order.createdAt
                });
            }
        }
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
    }
    catch (e) {
        next(e);
    }
};

<<<<<<< HEAD
const getProductList = async (req, res, next) => {
    try {
        const productList = await fetchProductList();

        res.json(productList);
=======
const getOrderList = async (req, res, next) => {
    const userId = req.authData.userId;
    try {
        const orderList = await fetchOrderListByUserID(userId);
        orderList.forEach(async e => {
            const firstOrderItem = await fetchFirstOrderItem(e);
            const firstProduct = await fetchProductDetail(firstOrderItem._id);
            e.firstProduct = firstProduct;
        });
        res.json(orderList);
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
    }
    catch (e) {
        next(e);
    }
};

<<<<<<< HEAD
const updateProduct = async (req, res, next) => {
    try {

=======
const cancelOrder = async (req, res, next) => {
    const userId = req.authData.userId;
    const { orderID } = req.body;
    try {
        const order = await fetchOrderByID(orderID);
        if (userId != order.customer._id)
            res.json({ message: "order not found" });
        else {
            await updateOrderStatusToCancel(orderID);
            res.json({ message: "Order cancel Successful" });
        }
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
    }
    catch (e) {
        next(e);
    }
};

export default {
<<<<<<< HEAD
    createProduct, getProductList, getProductDetail, updateProduct
=======
    createOrder, getOrderDetail, getOrderList, cancelOrder
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
}