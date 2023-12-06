import yup from "yup";
import { category, department } from "../config/product.js";

const Sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const schemas = {
    createSchema: yup.object({
        body: yup.object({
            name: yup.string().required(),
            color: yup.string().nullable(),
            image: yup.string().nullable(),
            category: yup.string().required("Please select a category").oneOf(Object.values(category)),
            department: yup.string().required("Please select a department").oneOf(Object.values(department)),
            size: yup.string().required("Please select a size").oneOf(Sizes),
            description: yup.string().nullable(),
            price: yup.number().required("Please enter a price").integer("Please enter a decimal"),
            stock: yup.number().required("Please enter a value for stock").integer("Please enter a decimal")
        })
    })
}

export default schemas;