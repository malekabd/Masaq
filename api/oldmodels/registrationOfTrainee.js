import mongoose from "mongoose";

const registrationOfTrainee = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    programNumber:{ type: mongoose.Schema.ObjectId, ref: "ImplementedProgram" },
    TodayTraining: {
      type: Number,
    },
    employeeNumber: [{ type: mongoose.Schema.ObjectId, ref: "Employee" }],

    present: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const RegistrationOfTrainee = mongoose.model(
  "RegistrationOfTrainee",
  registrationOfTrainee
);

export default RegistrationOfTrainee;
