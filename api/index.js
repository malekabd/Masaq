import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import trainRouter from "./routes/trainRoutes.js";
import announcementRouter from "./routes/announcementRoutes.js";
import path from "path";
import cron from "node-cron";
import Announcement from "./models/announcementModal.js";

dotenv.config();

mongoose
  .connect(process.env.MONGOS_DB)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

app.use(express.json());

app.use(cookieParser());

cron.schedule("0 0 * * *", async () => {
  try {
    // Define your delete logic here
    // Example: Delete items older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    await Announcement.deleteMany({ createdAt: { $lt: sevenDaysAgo } });

    console.log("Scheduled task: Deleted items older than 7 days");
  } catch (error) {
    console.error("Scheduled task failed:", error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
app.use("/api/user", authRouter);
app.use("/api/train", trainRouter);
app.use("/api/announcement", announcementRouter);

app.use(express.static(path.join(__dirname, "client/dist/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
});

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ msg: `Can't find ${req.originalUrl} on this server!` });
  next();
});
