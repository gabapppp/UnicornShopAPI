import { OrderModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";
import productReviewModel from "../models/productReviewModel.js";

const createNewProductReview = async (productReview) => {
    const newProductReview = await productReviewModel.create({
        productID: productReview.product.productID,
        customerID: productReview.customer.customerID,
        comment: productReview.comment,
        rate: productReview.rate,
    });
    if (!newProductReview)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProductReview;
};

const updateProductReviewAverageRate = async (productId) => {
    const productReviews = await ProductReview.findAll({product_iD: productID });
  
    if (productReviews.length === 0) {
      return;
    }
  
    const totalRate = productReviews.reduce((sum, review) => sum + parseInt(review.rate, 10), 0);
    const averageRate = totalRate / productReviews.length;
  
    await ProductReview.update({ rate_agv: averageRate }, { where: { product_id: productId } });
  };

const productReviewList = async (productID) => {
    const list = await productReviewModel.find({ customerID: customerID, rate: rate , comment: comment });
    return list;
};

export {
    createNewProductReview, productReviewList, updateProductReviewAverageRate
}


