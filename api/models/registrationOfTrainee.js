import mongoose from "mongoose";

const registrationOfTrainee = new mongoose.Schema(
  {
    programNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    employeeNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    present: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const RegistrationOfTrainee = mongoose.model(
  "RegistrationOfTrainee",
  registrationOfTrainee
);

export default RegistrationOfTrainee;
