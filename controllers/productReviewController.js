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

        res.json(data)

        res.send('Thanh Cong')
    }
    catch (error) {
        next(error);
    }
};


const getProductReviewList = async (productID) => {
    const exist = await productReviewModel.exists({ productID: productID })
    if (!exist)
        throw new APIError(httpStatus.BAD_REQUEST, "no feedback")
    const list = await productReviewModel.findOne({ productID: productID });
    if (!list)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return list;
};

export default {
    postProductReview, getProductReviewList
}