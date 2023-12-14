import yup from "yup";

const schemas = {
    createSchema: yup.object({
        body: yup.object({
            phone: yup.string().required("Please enter a real phone number"),
            address: yup.string().required(),
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