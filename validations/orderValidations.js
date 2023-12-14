import yup from "yup";

const schemas = {
    createSchema: yup.object({
        body: yup.object({
            phone: yup.string().required("Please enter a real phone number"),
            address: yup.string().required(),

            // name: yup.string().required(),
            // color: yup.string().nullable(),
            // image: yup.string().nullable(),
            // category: yup.string().required("Please select a category").oneOf(Object.values(category)),
            // department: yup.string().required("Please select a department").oneOf(Object.values(department)),
            // size: yup.string().required("Please select a size").oneOf(Sizes),
            // description: yup.string().nullable(),
            // price: yup.number().required("Please enter a price").integer("Please enter a decimal"),
            // stock: yup.number().required("Please enter a value for stock").integer("Please enter a decimal")            
            fullname: yup.string().required(),
            phone: yup.string().required(),
            address: yup.string().required(),
            status: yup.string().required("Please select a category").oneOf(Object.values(orderStatus)),
            trackingID: yup.string().nullable(),
            customerID: yup.string().nullable(),
        })
    }),

    listSchema: yup.object({
        body: yup.object({
        }),
    }),

    detailSchema: yup.object({
        body: yup.object({
        }),
    }),
}

export default schemas;