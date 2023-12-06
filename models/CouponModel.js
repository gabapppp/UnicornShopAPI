import mongoose from "mongoose";
import { string } from "yup";
import { boolean } from "yup/lib/locale";

const couponSchema = new mongoose.Schema({
    couponcode :{type:String, required:true},
    name :{type:String},
    description :{type:String},
    type :{type:String, enum: ["voucher, discount, sale"]},
    uses :{type: Number},
    is_fixed :{type: Boolean},
    max_uses :{type: Number},
    expiresAT :{type: Date},
    startsAT :{type: Date},

},{timestamps: true})

const CouponModel = mongoose.model('coupon', couponSchema)
export default CouponModel
