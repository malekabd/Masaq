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
    employeeNumber: { type: mongoose.Schema.ObjectId, ref: "Employee" },

    present: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

registrationOfTrainee.pre(/^find/, function(next){
  this.populate({
    path:"programNumber",
    select:"programNumber",
  }).populate({
    path:"employeeNumber",
    select:"jobNumber",
  })
  next()
})

const RegistrationOfTrainee = mongoose.model(
  "RegistrationOfTrainee",
  registrationOfTrainee
);

export default RegistrationOfTrainee;
