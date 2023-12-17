import { createCouponList, getCouponList, getCouponDetail, updateCouponDetail, deleteCouponDetail } from "../services/couponAdminService";
import schemas from "../validations/couponValidation";


const createCouponCode = async (req, res, next) => {

  try {

    // Generate coupon code
    const couponCode = createCouponCode();
    
    // Create coupon object
    const coupon = {
      couponCode, 
    };

    // Create coupon
    const newCoupon = await createCouponList(coupon);

    res.json(newCoupon);

  } catch(err) {
    
    next(err);

  }

}

const createCoupon = async (req, res, next) => {
    const {qty, name, description, type, uses, is_fixed, max_uses, expiresAT, startsAT} = req.body
    try {
      let coupon;
      // Create coupon based on type
    if(type === type.voucher) {
      coupon = {
        name,
        type: type.voucher,
        value  
      }
    }

    if(type === type.discount) {
      coupon = {
        name,
        type: type.discount, 
        value: value + '%'  
      }
    }

    if(type === type.sale) {
      coupon = {
        name,
        type: type.sale,
        value: value + '% off'
      }
    }

    const { error } = schemas[type].validate(coupon);
    if(error) throw error;

    // Generate coupon code
    coupon.code = createCouponCode();

    // Create coupon
    const newCoupon = await createCouponCode(coupon);
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
        coupon += qty;
        res.json(coupon);
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
  createCoupon, createCouponCode, getAllCoupons, getCoupon, updateCoupon, deleteCoupon
}