import mongoose from "mongoose";

const trainingHall = new mongoose.Schema(
  {
    number: { type: Number },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    attendanceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    equipment: {
      type: String,
    },
  },
  { timestamps: true }
);

const TrainingHall = mongoose.model("TrainingHall", trainingHall);

export default TrainingHall;
