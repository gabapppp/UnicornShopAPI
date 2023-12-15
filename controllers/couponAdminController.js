import { createCouponList, getCouponList, getCouponDetail, updateCouponDetail, deleteCouponDetail } from "../services/couponAdminService";


const createCoupon = async (req, res, next) => {
    const {qty, name, description, type, uses, is_fixed, max_uses, expiresAT, startsAT} = req.body
    try {
        const newCouponList = await createCouponList({
            qty: qty,
            name: name,
            description: description,
            type: type,
            uses: uses,
            is_fixed: is_fixed,
            max_uses: max_uses,
            expiresAT: expiresAT,
            startsAT: startsAT,
        });
        res.json(newCoupon);
    }catch(error){
        next(error)
    }
}

const getAllCoupons = async (req, res, next) => {
    try {
      const coupons = await getCouponList({});
      res.json(coupons);
    } catch (error) {
      next(error);
    }
  }

  const getCoupon = async (req, res, next) => {

    try {
  
      const id = req.params.id;
  
      const coupon = await getCouponDetail(id);
  
      if(!coupon) {
        return res.status(404).send(); 
      }
  
      res.json(coupon);
  
    } catch (error) {
      next(error);
    }
  
  }

const updateCoupon = async (req, res, next) => {
    try {
      const updatedCoupon = await updateCouponDetail(
        req.params.id, 
        req.body
      );
      res.json(updatedCoupon);
    } catch (error) {
      next(error);
    }
}

const deleteCoupon = async (req, res, next) => {
    try {
      await deleteCouponDetail(req.params.id);
      res.json({message: 'Deleted'}); 
    } catch (error) {
      next(error);
    }
}

export default {
  createCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon
}