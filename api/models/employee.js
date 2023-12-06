import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
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
      type: String,
      required: true,
    },
    trainee: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
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

employee.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = bcryptjs.hashSync(this.password, 10);

  next();
});


const Employee = mongoose.model("Employee", employee);

export default Employee;
