import yup from "yup";

const rate = ["1", "2", "3", "4", "5"]
const schemas = {
    createSchema: yup.object({
        body: yup.object({
            rate: yup.string().required(),
            Comment: yup.string().required("Please enter"),
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