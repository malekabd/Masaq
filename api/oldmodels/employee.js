import mongoose from "mongoose";

const employee = new mongoose.Schema(
  {
    jobNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    trainer: {
      type: Boolean,
      required: true,
    },
    trainee: {
      type: Boolean,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employee);

export default Employee;
