import yup from "yup";

const schemas = {
    voucher: yup.object({
      name: yup.string().required(),
      type: yup.valid(types.voucher).required(),
      value: yup.string().required()  
    }),
  
    discount: yup.object({
      name: yup.string().required(),
      type: yup.valid(types.discount).required(),
      value: yup.string().required()
    }),
  
    sale: yup.object({
      name: yup.string().required(),
      type: yup.valid(types.sale).required(),  
      value: yup.string().required()
    })
}

export default schemas;