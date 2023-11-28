import mongoose from "mongoose";

const programEvaluation = new mongoose.Schema(
  {
    evaluationNumber: { type: Number, required: true },
    executedProgramNumber: {
      type: mongoose.Schema.ObjectId,
      ref: "ImplementedProgram",
    },
    traineeNumber: { type: mongoose.Schema.ObjectId, ref: "Employee" },
    trainerEvaluation: {
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
