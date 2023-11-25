import mongoose from "mongoose";

const programEvaluation = new mongoose.Schema(
  {
    executedProgramNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    traineeNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    traineeEvaluation: {
      type: Number,
      required: true,
    },
    programNumber: {
      type: Number,
      required: true,
    },
    hallEvaluation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ProgramEvaluation = mongoose.model(
  "ProgramEvaluation",
  programEvaluation
);

export default ProgramEvaluation;
