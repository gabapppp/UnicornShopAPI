import { fetchProductDetail, fetchProductList } from "../services/productService.js";

const getProductList = async (req, res, next) => {
    const { page, size } = req.query;
    try {
        const list = await fetchProductList(page, size);
        res.json(list)
    }
    catch (e) {
        next(e);
    }
};

const getProductDetail = async (req, res, next) => {
    const { productID } = req.query;
    try {
        const product = await fetchProductDetail(productID);
        res.json(product);
    }
    catch (e) {
        next(e);
    }
};

export default {
    getProductList,
    getProductDetail
}