import { model, Schema, Document } from "mongoose";
import { Staff } from "@/interfaces/users.interface.js";
import { staffRole, department } from "../config/staff.js";

const { ADMIN, MANAGER, OFFICER, ACCOUNTANT } = staffRole;
const { IT, HR, ACCOUNTING, MARKETING, FINANCES } = department;

const userStaffSchema: Schema = new Schema<Staff>(
  {
    username: { type: String, required: true },
    fullname: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: {
      type: String,
      required: true,
      enum: [ADMIN, OFFICER, MANAGER, ACCOUNTANT],
    },
    department: {
      type: String,
      required: true,
      enum: [IT, MARKETING, HR, ACCOUNTING, FINANCES],
    },
    address: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const StaffModel = model<Staff & Document>("Staff", userStaffSchema);
