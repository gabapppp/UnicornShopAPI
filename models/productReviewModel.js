import mongoose, { Schema } from "mongoose";
import { number } from "yup";

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
    feedback: { type: String },
    rate: { type: Number, enum: [1, 2, 3, 4, 5] },
    totalRate: { type: Boolean, enum: [1.0, 2.0, 3.0, 4.0, 5.0] },
}, { timestamps: true });

const productReviewModel = mongoose.model("productReview", productReviewSchema);
export default productReviewModel;