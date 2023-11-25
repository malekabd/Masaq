import mongoose from "mongoose";

const implementedProgram = new mongoose.Schema(
  {

  },
  { timestamps: true }
);

const ImplementedProgram = mongoose.model("ImplementedProgram", implementedProgram);

export default ImplementedProgram;
