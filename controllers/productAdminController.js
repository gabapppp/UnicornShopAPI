import { createNewProduct, fetchProductList, fetchProductDetail, updateProductByID } from "../services/productService.js";

const createProduct = async (req, res, next) => {
    const { name, color, image, category, department, sizeStock, description, price, stock } = req.body;
    try {
        const newProduct = await createNewProduct({
            name: name,
            color: color,
            image: image,
            category: category,
            department: department,
            sizeStock: sizeStock,
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
    const { id } = req.params;
    try {
        const product = await fetchProductDetail(id);
        res.json(product);
    }
    catch (e) {
        next(e);
    }
};

const getProductList = async (req, res, next) => {
    const { page, size } = req.query;
    try {
        console.log(page)
        const productList = await fetchProductList(page, size);
        res.json(productList);
    }
    catch (e) {
        next(e);
    }
};

const updateProduct = async (req, res, next) => {
    const { productID, name, color, image, category, department, size, description, price, stock } = req.body;
    try {
        const newProduct = await updateProductByID({
            productID: productID,
            name: name,
            color: color,
            image: image,
            category: category,
            department: department,
            size: size,
            description: description,
            price: price,
            stock: stock
        }); as
        res.json(newProduct);
    }
    catch (e) {
        next(e);
    }
};

export default {
    createProduct, getProductList, getProductDetail, updateProduct
}