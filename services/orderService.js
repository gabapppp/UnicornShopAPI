import { OrderModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";

const createNewOrder = async (order) => {
    const newOrder = await OrderModel.create({ username: order.username, fullname: order.fullname, email: order. });
    if (!newOrder)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProduct;
};

// const fetchOrderList = async () => {
//     const list = OrderModel.find({});
//     return list;
// };

// const fetchOrderDetail = async (productID) => {
//     const product = await ProductModel.findOne({ productID: productID });
//     if (!product)
//         throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
//     return product;
// };

// const updateOrder  = async (productID) => {
//     const oldProduct = await ProductModel.findOne({ productID: productID });
//     if (!oldProduct)
//         throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
//     const newProduct = await ProductModel.updateOne({ productID: productID }, {});
//     return newProduct;
// };

export {
    createNewOrder//, fetchProductList, fetchProductDetail, updateProduct
}

