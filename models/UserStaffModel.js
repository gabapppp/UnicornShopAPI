import mongoose from "mongoose";
import { staffRole, department } from "../config/staff.js";
const { ADMIN, MANGER, OFFICER, ACCOUNTANT } = staffRole;
const { IT, HR, ACCOUNTING, MARKETING, FINANCES } = department;
const userStaffSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: {
        type: String, required: true, enum: [ADMIN, OFFICER, MANGER, ACCOUNTANT]
    },
    department: {
        type: String, required: true, enum: [IT, MARKETING, HR, ACCOUNTING, FINANCES]
    },
    address: { type: String },
    password: { type: String, required: true },
}, { timestamps: true })

const UserStaffModel = mongoose.model('user.Account', userStaffSchema)

export default UserStaffModel;