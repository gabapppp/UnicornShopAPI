import mongoose from "mongoose";
import { orderStatus } from "../config/orderStatus.js";
const { PENDING, CANCELED, SUCCESS, INTRASIT, DELIVERED } = orderStatus;

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: [PENDING, CANCELED, SUCCESS, INTRASIT, DELIVERED], default: PENDING },
    trackingID: { type: String, default: null },
    customerRef: { type: String, required: true, },
}, { timestamps: true })

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel;