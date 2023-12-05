import { createNewProduct } from "../services/productService.js";

const createProduct = async (req, res, next) => {
    const { name, color, image, category, department, size, description, price, stock } = req.body;
    try {
        const newProduct = await createNewProduct({
            name: name,
            color: color,
            image: image,
            category: category,
            department: department,
            size: size,
            description: description,
            price: price,
            stock: stock
        });
        res.json(newProduct);
    }
    catch (error) {
        next(error);
    }
};

const getProductDetail = async (req, res, next) => {
    try {

    }
    catch (e) {
        next(e);
    }
};

const getProductList = async (req, res, next) => {
    try {

    }
    catch (e) {
        next(e);
    }
};

const updateProduct = async (req, res, next) => {
    try {

    }
    catch (e) {
        next(e);
    }
};



export default {
    createProduct, getProductList, getProductDetail, updateProduct
}