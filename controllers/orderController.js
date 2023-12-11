import { createNewOrder, OrderList, OrderDetail
    //fetchOrderList, fetchOrderDetail, updateOrder 
} from "../services/orderService.js";

const createOrder = async (req, res, next) => {
    const { username, fullname, email, phone, address, status, trackingID, customerID } = req.body;
    try {
        const newOrder = await createNewProduct({
            username: username,
            fullname: name, 
            email: email, 
            phone: phone, 
            address: address, 
            status: status, 
            trackingID: trackingID, 
            customerID: customerID
        });
        res.json(newProduct);
    }
    catch (error) {
        next(error);
    }
};

const getOrderDetail = async (req, res, next) => {
    const customerID = "";
    try {
        const order = await OrderDetail(customerID);
        res.json(order);
    }
    catch (e) {
        next(e);
    }
};

const getOrderList = async (req, res, next) => {
    try {
        const orderList = await orderList();

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

// export default {
//     createProduct, getProductList, getProductDetail, updateProduct
// }