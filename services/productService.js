import { ProductModel } from "../models/index.js";
import httpStatus from 'http-status';
import APIError from "../utils/APIError.js";
import cloudinary from "../utils/cloudinary.js";

const createNewProduct = async (product) => {
    const existProduct = await ProductModel.findOne({
        name: product.name,
        size: product.size
    });
    if (existProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Product already exists.");
    let imageList = [];

    product.image.forEach(element => {
        const imageUploader = cloudinary.v2.uploader.upload('data:image/jpeg;base64,' + element.imgBase64, {
            folder: "ProductImage",
            public_id: element.name,
            overwrite: true,
            invalidate: true,
            width: 810, height: 456,
            crop: "fill"
        }, (error, result) => {
            console.log(error)
        });

        imageList.push({
            name: element.name,
            imageUrl: 'http://res.cloudinary.com/daof8b1vx/image/upload/v1703098387/ProductImage/' + element.name + '.webp'
        });
    });

    const newProduct = await ProductModel.create({
        name: product.name,
        size: product.size,
        price: product.price,
        sizeStock: product.sizeStock,
        image: imageList,
        category: product.category,
        department: product.department,
        description: product.description
    });
    if (!newProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newProduct;
};

const fetchProductList = async (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    const list = ProductModel.paginate({}, { offset: offset, limit: limit }).then({});
    return list;
};

const fetchProductDetail = async (productID) => {
    const exist = await ProductModel.exists({ productID: productID })
    if (!exist)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found")
    const product = await ProductModel.findOne({ productID: productID });
    if (!product)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return product;
};

const updateProductByID = async (productID, name, size, price, stock,) => {
    const oldProduct = await ProductModel.findOne({ productID: productID });
    if (!oldProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found");
    if (name == undefined)
        name = oldProduct.name;
    if (size == undefined)
        size = oldProduct.size;
    if (price == undefined)
        price = oldProduct.price;
    if (stock == undefined)
        stock == oldProduct.stock;
    const newProduct = await ProductModel.updateOne({ productID: productID }, {
        size: size,
        name: name,
        stock: stock,
        price: price
    });
    return newProduct;
};

const descreaseProductStockByID = async (productID, qty) => {
    const oldProduct = await ProductModel.findOne({ productID: productID });
    if (!oldProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Product not found");
    const newStock = oldProduct.stock - qty;
    const newProduct = await ProductModel.updateOne({ productID: productID }, { stock: newStock });
    if (!newProduct)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return;
};

export {
    createNewProduct, fetchProductList, fetchProductDetail, updateProductByID, descreaseProductStockByID
}