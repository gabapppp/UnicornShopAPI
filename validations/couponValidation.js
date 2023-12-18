import yup, { object } from "yup";
import { couponDescription, couponType } from "../config/coupon";
const schemas = {
  createSchema: yup.object({
    body: yup.object({
      name: yup.string().required(),
      code: yup.string().required(),
      couponDescription: yup.string().required("Please select a Desription").oneOf(Object.values(couponDescription)),
      type: yup.string().required("Please select a type").oneOf(Object.values(couponType)),
      max_uses: yup.number().required("Please enter a value for max coupon").integer("Please enter a decimal")
    })
  })

}

export default schemas;