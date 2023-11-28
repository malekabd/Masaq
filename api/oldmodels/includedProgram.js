import mongoose from "mongoose";

const includedProgram = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
    }, 
    implementingSection: {
      type: String,
      required: true,
    },
    programPackage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const IncludedProgram = mongoose.model(
  "IncludedProgram",
  includedProgram
);

export default IncludedProgram;
