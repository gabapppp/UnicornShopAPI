import { createnewCoupon, fetchCouponDetail, fetchupdateCoupon, fetchdeleteCoupon, fetchcheckCoupon, fetchCouponList} from "../services/couponAdminService";

const createCoupon = async (req, res, next) => {

  const { code, name, description, type, max_uses} = req.body;
    
  try {
    const newCoupon = await createnewCoupon({
      code: code,
      name: name,
      description: description,
      type: type,
      max_uses: max_uses,
    });
    res.json(newCoupon);
  }

  catch (error){
    next(error);
  }

}

const getCouponList = async (req, res, next) => {
  const {page, size} = req.query;
  try {
    console.log(page)
    const couponList = await fetchCouponList(page,size);
    res.json(couponList);
  }
  catch(error) {
    next (error);
  }
};

const getDetailCoupon = async (req, res, next) => {

      const id  = req.params.id
  try {
    const coupon = await fetchCouponDetail(id);
    res.json(coupon);
  }
  catch(error){
    next (error);
  }
 
}; 


const updateCoupon = async (req, res, next) => {

    const {code, max_uses, type, description } = req.body;
    try{
      const newCoupon = await fetchupdateCoupon({
        code: code,
        max_uses: max_uses,
        type: type,
        description: description,
      }); as
      res.json(newCoupon);
    }

    catch (error) {
      next(error);
    }
};
    

const deleteCoupon = async (req, res, next) => {

  const {code, name, type, max_uses } = req.body;
  try{
    const newCoupon = await fetchdeleteCoupon({
      code: code,
      max_uses: max_uses,
      type: type,
      name: name,
    }); as
    res.json(newCoupon);
  }

  catch (error) {
    next(error);
  }
}; 

const checkCoupon = async (req, res, next) => {
  
  const {code, couponID, CustomerID} = req.body;
  try{
    const checkCoupon = await fetchcheckCoupon({
      code: code,
      CustomerID: CustomerID,
      couponID: couponID,
    }); as
    res.json(checkCoupon);
  }
  catch (error){
    next(error);
  }
};

const createCou = async (req, res, next) => {
    const id = req.params.id

    const coupon = await CouponModel.findOne({_id: id})

    coupon.max_uses = parseInt(CouponModel.max_uses) - 1

    coupon.save()
      
      res.json("Complete");
}



export default {
  createCoupon, getDetailCoupon, updateCoupon, deleteCoupon, checkCoupon, getCouponList
}