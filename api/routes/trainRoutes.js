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
router.patch("/editEmployee", protect, EditEmployee);
router.delete("/deleteEmployee", protect, deleteEmployee);

//Done
router.get("/getTrainingHall", protect, getTrainingHall);
router.get("/getAllTrainingHall", protect, getAllTrainingHall);
router.post("/addTrainingHall", protect, addTrainingHall);
router.patch("/editTrainingHall", protect, EditTrainingHall);
router.delete("/deleteTrainingHall", protect, deleteTrainingHall);

//Done
router.get("/getIncludedProgram", protect, getIncludedProgram);
router.get("/getAllIncludedProgram", protect, getAllIncludedProgram);
router.post("/addIncludedProgram", protect, addIncludedProgram);
router.patch("/editIncludedProgram", protect, EditIncludedProgram);
router.delete(
  "/deleteIncludedProgram",
  protect,
  deleteIncludedProgramController
);

//Done
router.get("/getImplementedProgram", protect, getImplementedProgram);
router.get("/getAllImplementedProgram", protect, getAllImplementedProgram);
router.post("/addImplementedProgram", protect, addImplementedProgram);
router.patch("/editImplementedProgram", protect, EditImplementedProgram);
router.delete("/deleteImplementedProgram", protect, deleteImplementedProgram);

//Done
router.get("/getRegistrationOfTrainee", protect, getRegistrationOfTrainee);
router.get(
  "/getAllRegistrationOfTrainee",
  protect,
  getAllRegistrationOfTrainee
);
router.post("/addRegistrationOfTrainee", protect, addRegistrationOfTrainee);
router.patch("/editRegistrationOfTrainee", protect, EditRegistrationOfTrainee);
router.delete(
  "/deleteRegistrationOfTrainee",
  protect,
  deleteRegistrationOfTrainee
);

//Done
router.get("/getProgramEvaluation", protect, getProgramEvaluation);
router.get("/getAllProgramEvaluation", protect, getAllProgramEvaluation);
router.post("/addProgramEvaluation", protect, addProgramEvaluation);
router.patch("/editProgramEvaluation", protect, EditProgramEvaluation);
router.delete("/deleteProgramEvaluation", protect, deleteProgramEvaluation);

export default router;
