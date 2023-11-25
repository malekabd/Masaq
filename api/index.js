import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import trainRouter from "./routes/trainRoutes.js";
import AppError from "./utils/appError.js";
dotenv.config();

mongoose
  .connect(process.env.MONGOS_DB)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
app.use("/api/user", authRouter);
app.use("/api/train", trainRouter);

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
