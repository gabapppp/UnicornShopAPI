import productReviewModel from "../models/productReviewModel.js";



const postProductReview = async (req, res, next) => {    

    try {
        const productID = req.params.id

        const data = {
            productID: productID,
            customerID: req.body.customerID,
            feedback: req.body.feedback,
            rate: req.body.rate
        }

        // res.send('Thanh Cong')

        // const productReviews = await productReviewModel.findAll({productID });
        // const totalRate = productReviews.reduce((sum, review) => sum + parseInt(review.rate, 10), 0);
        // const averageRate = totalRate / productReviews.length;
  
        // await productReviewModel.totalRate(averageRate);

        res.json(
            // totalRate,
            data
        )
    }
    catch (error) {
        next(error);
    }
};

const getProductReviewList = async ( res, req ) => {


    const exist1 = await productReviewModel.exists({ product_ID: productID });
    if (!exist1)
        throw new APIError(httpStatus.BAD_REQUEST, "No feedback")
    const list = await productReviewModel.find({ product_ID: productID });
    if (!list)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return list;

    res.json(list);
};

export default {
    postProductReview, getProductReviewList
}