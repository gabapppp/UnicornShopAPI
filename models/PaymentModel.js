import mongoose from "mongoose";
import { couponDescription } from "../config/coupon.js";
const { FREESHIP, PERCENTAGE, PERFREESHIP, SUBTOTAL, DISCOUNT } = couponDescription;

const paymentSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
    couponID: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    couponDescription: { type: String, enum: [FREESHIP, PERCENTAGE, PERFREESHIP, SUBTOTAL, DISCOUNT] },
    billAmount: { type: Number, required: true },
    couponAmount: { type: Number },
    shippingFee: { type: Number, required: true },
    amount: { type: Number, required: true }
}, { timestamps: true })

//Check coupon before save

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;