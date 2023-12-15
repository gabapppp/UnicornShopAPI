import { CouponModel } from "../models/index.js";
import OrderModel from '../models/OrderModel';
import httpStatus from 'http-status';
import APIError from '../utils/APIError.js';

const createCouponList = async (coupon) => {
    const oldCoupon = await CouponModel.findOne({ couponcode: coupon.couponcode.toLowerCase() });
    if (oldCoupon)
        throw new APIError(httpStatus.BAD_REQUEST, "Coupon already exists.")
    const newCoupon = await CouponModel.create(coupon);
    if (!newCoupon)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newCoupon;
}

const getAllCoupons = async (type) => {
  let filter = {};
  if (type){
    filter = {
      type: type
    };
  }
  
  const validFilters = ['name', 'type', 'maxUses'];
  // Input validation
  if(!filter || Object.keys(filter).some(f => !validFilters.includes(f))) {
    throw Error('Invalid filter'); 
  }

    try {
  
      const coupons = await CouponModel.findOne({filter});
      
      if(!coupons) {
        throw new APIError("No coupons found");
      }
      return coupons;
  
    } catch (error) {
      
      throw error;
  
    }
  
  }

const getCoupon = async () => {
    try {
      const coupon = await CouponModel.findById();

      if(!coupon) {
        throw new APIError("Coupon not found");
      }
      
      return coupon;
  
    } catch (error) {
      throw error;
    }
  }

const updateCoupon = async (couponId, updatedCoupon) => {

    try {
  
      // Kiểm tra couponId
      if(!couponId) throw new Error('Coupon id is required');
  
      // Validation coupon đầu vào
      //...
  
      // Tìm coupon cần update
      const coupon = await CouponModel.findById(couponId);
  
      if(!coupon) {
        throw new Error('Coupon not found');
      }
  
      // Cập nhật thông tin coupon
      Object.assign(coupon, updatedCoupon);
  
      // Lưu lại 
      await coupon.save();
  
      // Trả về coupon
      return coupon;
  
    } catch (error) {
  
      throw error;
  
    }
  
}

const deleteCoupon = async (couponId) => {
    try {
  
      // Validate couponId
      if(!couponId) throw new Error('Coupon id is required');
  
      // Tìm coupon cần xoá
      const coupon = await CouponModel.findById(couponId);
  
      if(!coupon) {
        throw new Error('Coupon not found'); 
      }
  
      // Xoá coupon
      await coupon.remove();
  
      // Trả kết quả
      return {message: 'Coupon deleted successfully'};
  
    } catch (error) {
  
      throw error;
  
    }
  }

  const isValidCoupon = async (couponCode) => {

    try {
      
      // Validate couponCode
      if(!couponCode) throw new Error('Coupon code is required');
  
      // Tìm coupon theo mã
      const coupon = await CouponModel.findOne({
        couponCode: couponCode
      });
  
      if(!coupon) {
        return false;
      }
  
      // Kiểm tra hạn sử dụng
      if(new Date() > coupon.expiresAT) {
        return false;
      }
  
      // Kiểm tra số lượng sử dụng
      if(coupon.uses >= coupon.max_uses) {
        return false;
      }
  
      return true;
  
    } catch (error) {
      throw error;
    }
  
  }

  const applyCoupon = async (orderId, couponCode) => {

    try {
  
      // Validate
      if(!orderId) throw 'Order ID is required';
      if(!couponCode) throw 'Coupon code is required';
      
      // Kiểm tra coupon có hợp lệ
      const isValid = await isValidCoupon(couponCode);
      if(!isValid) throw 'Coupon is invalid';
  
      // Tìm đơn hàng
      const order = await OrderModel.findById(orderId);
      if(!order) throw 'Order not found';
  
      // Áp dụng coupon
      order.couponCode = couponCode;
  
      // Tính toán giảm giá
      //...
  
      // Cập nhật đơn hàng
      await order.save();
  
      return order;
  
    } catch (error) {
      throw error;
    }
  
  }


export {
    createCouponList, getAllCoupons, getCoupon, updateCoupon, deleteCoupon, isValidCoupon, applyCoupon
}