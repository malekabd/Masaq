import mongoose from "mongoose";

const trainingHall = new mongoose.Schema(
  {
    hallNumber: { type: Number, unique: true },
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
    },
    equipments: {
      type: [String],
    },
  },
  { timestamps: true }
);

const TrainingHall = mongoose.model("TrainingHall", trainingHall);

export default TrainingHall;
