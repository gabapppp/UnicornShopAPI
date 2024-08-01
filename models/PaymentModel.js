import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customerId: { type: String }
}, { timestamps: true })

const PaymentModel = mongoose.model('payments', paymentSchema)

export default PaymentModel;