import express from "express";
import {
  getEmployee,
  addEmployee,
  getAllEmployee,
} from "../Controllers/employeeController.js";
import {
  addTrainingHall,
  getAllTrainingHall,
  getTrainingHall,
} from "../Controllers/trainingHallController.js";
import {
  addIncludedProgram,
  getAllIncludedProgram,
  getIncludedProgram,
} from "../Controllers/includedProgramController.js";
import {
  addRegistrationOfTrainee,
  getRegistrationOfTrainee,
} from "../Controllers/registrationOfTraineeController.js";
import {
  addProgramEvaluation,
  getProgramEvaluation,
} from "../Controllers/programEvaluationController.js";
const router = express.Router();

router.get("/getEmployee", getEmployee);
router.get("/getAllEmployee", getAllEmployee);
router.post("/addEmployee", addEmployee);

router.get("/getTrainingHall", getTrainingHall);
router.get("/getAllTrainingHall", getAllTrainingHall);
router.post("/addTrainingHall", addTrainingHall);

router.get("/getIncludedProgram", getIncludedProgram);
router.get("/getAllIncludedProgram", getAllIncludedProgram);
router.post("/addIncludedProgram", addIncludedProgram);

router.get("/getProgramEvaluation", getProgramEvaluation);
router.post("/addProgramEvaluation", addProgramEvaluation);

router.get("/getRegistrationOfTrainee", getRegistrationOfTrainee);
router.post("/addRegistrationOfTrainee", addRegistrationOfTrainee);

export default router;
