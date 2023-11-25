import mongoose from "mongoose";

const availableProgram = new mongoose.Schema({
  
}, { timestamps: true });

const AvailableProgram = mongoose.model("AvailableProgram", availableProgram);

export default AvailableProgram;
