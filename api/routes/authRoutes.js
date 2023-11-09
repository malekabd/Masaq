import express from "express";
import { google, login, signup } from "../Controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/google", google);
export default router;
