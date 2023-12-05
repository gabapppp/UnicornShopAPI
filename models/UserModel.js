import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String },
}, { collection: "user.Customer" })

const UserModel = mongoose.model('UserSchema', userSchema)

export default UserModel;