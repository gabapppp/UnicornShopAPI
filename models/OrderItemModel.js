import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderId: { type: String },
    productId: { type: String },
    qty: { type: Number },
    price: { type: Number }
}, { timestamps: true })

const OrderItemModel = mongoose.model('OrderItem', orderItemSchema)

export default OrderItemModel;