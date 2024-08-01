import mongoose from "mongoose";
import { orderStatus } from "../config/orderStatus.js";

const orderItemSchema = new mongoose.Schema({
    productId: { type: String }
}, { timestamps: true })

const OrderItemModel = mongoose.model('OrderItem', orderItemSchema)

export default OrderItemModel;