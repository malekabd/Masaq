import express from "express";
import { protect } from "../Controllers/authController.js";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
} from "../Controllers/announcementController.js";
const router = express.Router();
router.get("/getAllAnnouncement", getAllAnnouncement);
router.post("/addAnnouncement", protect, addAnnouncement);
router.delete("/deleteAnnouncement", deleteAnnouncement);

export default router;
