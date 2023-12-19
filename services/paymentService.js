import { PaymentModel, CouponModel } from "../models/index.js"


const createPayment = async (orderID, orderItems, couponCode) => {
    let couponID;
    let billAmount = 0;
    let shippingFee = 0;
    let couponAmount = 0;
    let amount = 0;
    let couponDescription;
    orderItems.forEach(element => {
        billAmount += element.productPrice * element.qty;
    });
    shippingFee = 40000;
    if (couponCode) {
        const coupon = await CouponModel.findOne({ couponcode: couponCode });
        if (!coupon)
            throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
        couponID = coupon._id;
        couponDescription = coupon.description;
        // handle coupon amount here
    };
    amount = billAmount - couponAmount;
    const newPayment = await PaymentModel.create({
        orderID: orderID,
        billAmount: billAmount,
        shippingFee: shippingFee,
        couponID: couponID,
        couponAmount: couponAmount,
        couponDescription: couponDescription,
        amount: amount
    });
    if (!newPayment)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!");
    return newPayment;
}

const updatePayment = async (paymentID) => {
    const payment = await PaymentModel.findById(paymentID);
    if (!payment)
        throw new APIError(httpStatus.BAD_REQUEST, "Payment not found");
    const newPayment = await PaymentModel.findOneAndUpdate({ _id: paymentID }, {})
    return newPayment;
}

export {
    createPayment,
    updatePayment
}