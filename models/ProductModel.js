import mongoose from "mongoose";
import { category, department } from "../config/product.js";
import mongoosePaginate from 'mongoose-paginate-v2';
const { TEES, ACCESSORIES, POLOS, SWEETSHIRTS_AND_HOODLES, PANTS, JACKETS, SWEATERS, SHORTS, SWIMWEAR, CASUAL_SHIRT, LOUGE_AND_UNDERWEAR } = category;
const { MALE, KID, FEMALE, BIG_AND_TALL, UNISEX } = department;

const productSchema = new mongoose.Schema({
    productID: { type: Number, unique: true },
    name: { type: String, required: true },
    color: { type: String },
    image: { type: String },
    category: { type: String, enum: [TEES, ACCESSORIES, POLOS, SWEETSHIRTS_AND_HOODLES, PANTS, JACKETS, SWEATERS, SHORTS, SWIMWEAR, CASUAL_SHIRT, LOUGE_AND_UNDERWEAR] },
    department: { type: String, enum: [MALE, KID, FEMALE, BIG_AND_TALL, UNISEX] },
    size: {
        type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"], required: true
    },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    rateAvg: { type: Number }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

productSchema.pre('save', function (next) {
    const doc = this;
    try {
        let randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        async function checkAndCreateID() {
            const exist = await ProductModel.findOne({ productID: randomNumber })
            if (!exist) {
                doc.productID = randomNumber;
                next();
            };
        }

        const timeoutDuration = 5000;
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            next(new Error('Timeout occurred while creating data'));
        }, timeoutDuration);

        checkAndCreateID();
    }
    catch (error) {
        next(error)
    }

});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;