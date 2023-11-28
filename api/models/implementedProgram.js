import mongoose from "mongoose";

const implementedProgram = new mongoose.Schema(
  {
    programNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    includedProgramNumber: { type: mongoose.Schema.ObjectId, ref: "IncludedProgram" },
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
/* The code `implementedProgram.pre(/^find/, function(next){ ... })` is a pre-hook middleware function
that is executed before any `find` operation is performed on the `ImplementedProgram` model. */
implementedProgram.pre(/^find/, function(next){
  this.populate({
    path:"includedProgramNumber",
    select:"programNumber",
  }).populate({
    path:"hallNumber",
    select:"hallNumber",
  }).populate({
    path:"trainerNumber",
    select:"jobNumber",
  })
  next()
})

const ImplementedProgram = mongoose.model(
  "ImplementedProgram",
  implementedProgram
);

export default ImplementedProgram;
