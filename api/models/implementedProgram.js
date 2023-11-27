import mongoose from "mongoose";

const implementedProgram = new mongoose.Schema(
  {
    programNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    programName: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hallNumber: { type: mongoose.Schema.ObjectId, ref: "TrainingHall" },
    attendanceType: {
      type: String,
      required: true,
    },
    targetedCategory: {
      type: String,
      required: true,
    },
    trainerNumber: [{ type: mongoose.Schema.ObjectId, ref: "Employee" }],
    days: {
      type: Number,
      required: true,
    },
    attendanceNumber: {
      type: Number,
      required: true,
    },
    traineeList: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const ImplementedProgram = mongoose.model(
  "ImplementedProgram",
  implementedProgram
);

export default ImplementedProgram;
