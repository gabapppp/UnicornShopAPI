import mongoose from "mongoose";

const userStaffSchema = new mongoose.Schema({
    username: { type: String },
    fullname: { type: String, },
    image: { type: String },
    email: { type: String, required: true, },
    phone: { type: String, required: true },
    password: { type: String },
}, { collection: "user.Account" })

const UserStaffModel = mongoose.model('UserStaffSchema', userStaffSchema)

export default UserStaffModel;