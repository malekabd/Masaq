import express from "express";
import { train } from "../Controllers/trainController.js";
import { protect } from "../Controllers/authController.js";
const router = express.Router();

router.post("/hello",protect,train);

export default router;
