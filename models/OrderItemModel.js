import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const orderItemSchema = new mongoose.Schema({
    item: { type: itemSchema, unique: true },
    productName: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    qty: { type: Number, required: true }
});

//check pair key [orderID, productID] before save

const OrderItemModel = mongoose.model("OrderItem", orderItemSchema);

export default OrderItemModel;