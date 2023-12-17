import {
    createNewProductReview, productReviewList, updateProductReviewAverageRate
} from "../services/productReviewService.js";

const createProductReview = async (req, res, next) => {    
    const { productID, customerID, comment, rate } = req.body;
    try {
        let comment = []
        let rate = 0;
        const newProductReview = await createNewProductReview({
            custemerID: custemerID,
            productID: productID
        });

        await updateProductReviewAverageRate(productID);
        
        res.json({
            customerID: customerID,
            producId: productID,
            rate: newProductReview.rate,
            comment: newProductReview.comment
        });
    }
    catch (error) {
        next(error);
    }
};


const getProductReviewList = async (req, res, next) => {
    const productID = req.productID;
    try {
        const productReviewList = await productReviewList(productID);
        // productReviewList.forEach(async e => {
        //     const firstProductReview = await productReviewList(productID);
        //     e.firstProduct = firstProduct;
        // });
        res.json(productReviewList);
    }
    catch (e) {
        next(e);
    }
};

export default {
    createProductReview, getProductReviewList
}