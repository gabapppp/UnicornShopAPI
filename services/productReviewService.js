import { productReviewModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";

const postNewProductReview = async (productReview) => {
    const newProductReview = await productReviewModel.create({newProductReview});
    if (!newProductReview)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProductReview;
};

// const createNewProductReview = async (productID, customerID, comment, rate) => {
//     try {
//       // Tạo đối tượng đánh giá sản phẩm mới
//       const review = new productReviewModel({
//         productID: mongoose.Types.ObjectId(productID),
//         customerID: mongoose.Types.ObjectId(customerID),
//         comment,
//         rate,
//       });
  
//       // Lưu đánh giá sản phẩm vào cơ sở dữ liệu
//       await review.save();
  
//       return review;
//     } catch (error) {
//       throw new Error('Đã xảy ra lỗi khi tạo đánh giá sản phẩm.');
//     }
//   };

const updateProductReviewAverageRate = async (productID) => {
    const productReviews = await productReviewModel.findAll({productID });
  
    if (productReviews.length === 0) {
      return;
    }
  
    const totalRate = productReviews.reduce((sum, review) => sum + parseInt(review.rate, 10), 0);
    const averageRate = totalRate / productReviews.length;
  
    await productReviewModel.update({ rate_agv: averageRate }, { where: { productID } });
  };

const productReviewList = async (productID) => {
    const rate =0;
    const comment = [];
    const list = await productReviewModel.find({ customerID: customerID, rate: rate , comment: comment });
    // const list = productReviewModel.paginate({}, { rate: rate, comment: comment }).then({});
    return list;
};

export {
    postNewProductReview, productReviewList, updateProductReviewAverageRate
}


