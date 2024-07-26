<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";
=======
import mongoose from "mongoose";
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
import { orderStatus } from "../config/orderStatus.js";
const { PENDING, CANCELED, SUCCESS, INTRASIT, DELIVERED } = orderStatus;

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: [PENDING, CANCELED, SUCCESS, INTRASIT, DELIVERED], default: PENDING },
<<<<<<< HEAD
    trackingID: { type: String },
=======
    trackingID: { type: String, default: null },
    itemsList: {
        ref: "orderitems",
        type: String
    },
    customerRef: { type: String, required: true, },
>>>>>>> e163298 (Revert "Merge pull request #12 from gabapppp:gb109-be")
}, { timestamps: true })

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel;