import { CouponModel, OrderModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from '../utils/APIError.js';

const createnewCoupon = async (res) => {
    const existCoupon = await CouponModel.findOne ({
      code: Coupon.code,
      name: Coupon.name,
      type: Coupon.type,
    });
    if(existCoupon)
      throw new APIError(httpStatus.BAD_REQUEST, "Coupon already exists.")
    const newCoupon = await CouponModel.create(Coupon);
    if(!newCoupon)
      throw new APIError(httpStatus.BAD_REQUEST, "Server needed a break!")
    Coupon.max_uses = parseInt(CouponModel.max_uses) - 1
    return newCoupon;
};

const fetchCouponList = async (page, size) => {
  const limit = size ? +size :5;
  const offset = page ? page * limit : 0;
  const list = CouponModel.paginate({}, {offset: offset, limit: limit}). then({});
  return list;
}

const fetchupdateCoupon = async (code, max_uses, type, description) => {
  const Oldcoupon = await CouponModel.findOne({code: code, max_uses: max_uses, type: type, description: description});
  if (!Oldcoupon)
    throw new APIError(httpStatus.BAD_REQUEST, "Coupon not found")
  const newCoupon = await CouponModel.updateOne({code: code, max_uses: max_uses, type: type, description: description});
  return newCoupon;
};

const fetchdeleteCoupon = async (code, name, type, max_uses) => {
  const Oldcoupon = await CouponModel.findOne({code: code, name: name, type: type, max_uses: max_uses});
  if(!Oldcoupon)
   throw new APIError(httpStatus.BAD_REQUEST, "Coupon not found")
  const newCoupon = await CouponModel.deleteOne({code: code, name: name, type: type, max_uses: max_uses});
  return newCoupon;
};

const fetchDetailCoupon = async(couponID) => {
  const coupon = await CouponModel.findOne({couponID: couponID});
  if (!coupon)
    throw new APIError(httpStatus.BAD_REQUEST, "Coupon not found")
  return coupon;
}

const fetchcheckCoupon = async(code, customerID, couponID) => {
  const coupon = await CouponModel.findOne({code: code});
  if(!coupon)
    throw new APIError(httpStatus.BAD_REQUEST, "Coupon not found")
  const checkCouponID = await CouponModel.findOne({couponID: couponID});
  const checkCustomerID = await OrderModel.findOne({customerID: customerID});
  if (checkCouponID && checkCustomerID)
    throw new APIError(httpStatus.BAD_REQUEST, "Coupon has been used")
  return coupon;
}



export {
   createnewCoupon , fetchDetailCoupon, fetchupdateCoupon, fetchdeleteCoupon, fetchcheckCoupon, fetchCouponList
}