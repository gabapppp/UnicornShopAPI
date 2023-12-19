import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderID: { type: String, ref: "Order", required: true },
    productID: { type: Number, ref: "Product", required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    qty: { type: Number, required: true }
});

//check pair key [orderID, productID] before save

const OrderItemModel = mongoose.model("OrderItem", orderItemSchema);

export default OrderItemModel;