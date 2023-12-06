import { ProductModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";

const createNewProduct = async (product) => {
    const existProduct = await ProductModel.findOne({
        name: product.name,
        size: product.size
    });
    if (existProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Product already exists.")
    const newProduct = await ProductModel.create(product);
    if (!newProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProduct;
};

const fetchProductList = async () => {
    const list = ProductModel.find({});
    return list;
};

const fetchProductDetail = async (productID) => {
    const product = await ProductModel.findOne({ productID: productID });
    if (!product)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
    return product;
};

const updateProduct = async (productID) => {
    const oldProduct = await ProductModel.findOne({ productID: productID });
    if (!oldProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
    const newProduct = await ProductModel.updateOne({ productID: productID }, {});
    return newProduct;
};

export {
    createNewProduct, fetchProductList, fetchProductDetail, updateProduct
}


