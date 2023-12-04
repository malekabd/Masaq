import express from "express";
import {
  getEmployee,
  addEmployee,
  getAllEmployee,
  EditEmployee,
  deleteEmployee,
} from "../Controllers/employeeController.js";
import {
  addTrainingHall,
  getAllTrainingHall,
  getTrainingHall,
  deleteTrainingHall,
  EditTrainingHall,
} from "../Controllers/trainingHallController.js";
import {
  EditIncludedProgram,
  addIncludedProgram,
  deleteIncludedProgramController,
  getAllIncludedProgram,
  getIncludedProgram,
} from "../Controllers/includedProgramController.js";
import {
  EditRegistrationOfTrainee,
  addRegistrationOfTrainee,
  deleteRegistrationOfTrainee,
  getAllRegistrationOfTrainee,
  getRegistrationOfTrainee,
} from "../Controllers/registrationOfTraineeController.js";
import {
  EditProgramEvaluation,
  addProgramEvaluation,
  deleteProgramEvaluation,
  getAllProgramEvaluation,
  getProgramEvaluation,
} from "../Controllers/programEvaluationController.js";
import {
  EditImplementedProgram,
  addImplementedProgram,
  deleteImplementedProgram,
  getAllImplementedProgram,
  getImplementedProgram,
} from "../Controllers/implementedProgramController.js";
import { protect } from "../Controllers/authController.js";
const router = express.Router();

router.get("/getEmployee", protect, getEmployee);
router.get("/getAllEmployee", protect, getAllEmployee);
router.post("/addEmployee", protect, addEmployee);
router.patch("/editEmployee", EditEmployee);
router.delete("/deleteEmployee", deleteEmployee);

//Done
router.get("/getTrainingHall", getTrainingHall);
router.get("/getAllTrainingHall", getAllTrainingHall);
router.post("/addTrainingHall", addTrainingHall);
router.patch("/editTrainingHall", EditTrainingHall);
router.delete("/deleteTrainingHall", deleteTrainingHall);

//Done
router.get("/getIncludedProgram", getIncludedProgram);
router.get("/getAllIncludedProgram", getAllIncludedProgram);
router.post("/addIncludedProgram", addIncludedProgram);
router.patch("/editIncludedProgram", EditIncludedProgram);
router.delete(
  "/deleteIncludedProgram",

  deleteIncludedProgramController
);

//Done
router.get("/getImplementedProgram", getImplementedProgram);
router.get("/getAllImplementedProgram", getAllImplementedProgram);
router.post("/addImplementedProgram", addImplementedProgram);
router.patch("/editImplementedProgram", EditImplementedProgram);
router.delete("/deleteImplementedProgram", deleteImplementedProgram);

//Done
router.get("/getRegistrationOfTrainee", getRegistrationOfTrainee);
router.get(
  "/getAllRegistrationOfTrainee",

  getAllRegistrationOfTrainee
);
router.post("/addRegistrationOfTrainee", addRegistrationOfTrainee);
router.patch("/editRegistrationOfTrainee", EditRegistrationOfTrainee);
router.delete(
  "/deleteRegistrationOfTrainee",

  deleteRegistrationOfTrainee
);

//Done
router.get("/getProgramEvaluation", getProgramEvaluation);
router.get("/getAllProgramEvaluation", getAllProgramEvaluation);
router.post("/addProgramEvaluation", addProgramEvaluation);
router.patch("/editProgramEvaluation", EditProgramEvaluation);
router.delete("/deleteProgramEvaluation", deleteProgramEvaluation);

export default router;
