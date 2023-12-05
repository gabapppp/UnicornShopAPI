import mongoose, { Schema } from "mongoose";
import { category } from "../config/product.js  ";
const { TEES, ACCESSORIES, POLOS, SWEETSHIRTS_AND_HOODLES, PANTS, JACKETS, SWEATERS, SHORTS, SWIMWEAR, CASUAL_SHIRT, LOUGE_AND_UNDERWEAR } = category;

const productSchema = new mongoose.Schema({
    productID: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    color: { type: String },
    image: { type: String },
    category: { type: String, enum: [TEES, ACCESSORIES, POLOS, SWEETSHIRTS_AND_HOODLES, PANTS, JACKETS, SWEATERS, SHORTS, SWIMWEAR, CASUAL_SHIRT, LOUGE_AND_UNDERWEAR] },
    department: { type: String, enum: ["Male", "Kid", "Female", "Big and Tall", "Unisex"] },
    size: {
        type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"], required: true
    },
    description: { type: String },
    price: { type: Schema.Types.Decimal128, required: true },
    stock: { type: Schema.Types.Decimal128, default: 0 },
    rateAvg: { type: Number }
}, { collection: "products" });

const genarateProductID = () => {
    min = 100000;
    max = 999999;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
productSchema.pre('save', (next) => {
    const doc = this;
    if (!doc.productID) {
        let randomNumber = genarateProductID;

        function checkAndCreateID() {
            ProductModel.findOne({ productID: randomNumber }).sort({ customId: -1 }).exec((err, existingDoc) => {
                if (err) {
                    return next(err);
                }
                if (existingDoc) {
                    randomNumber = generateProductID;
                    return checkAndCreateID();
                }
                doc.productID = randomNumber;
                next();
            });
        }
        checkAndCreateID();
    } else {
        next();
    }
});

const ProductModel = mongoose.model("ProductSchema", productSchema);

export default ProductModel;