import mongoose, { Schema } from "mongoose";

const productReviewSchema = new mongoose.Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    customerID: {
        type: Schema.Types.ObjectId,
        ref: "user.customers",
        required: true
    },
    comment: { type: String },
    rate: { type: Number, enum: [1, 2, 3, 4, 5] },
}, { timestamps: true });

const productReviewModel = mongoose.model("productReview", productReviewSchema);
export default productReviewModel;