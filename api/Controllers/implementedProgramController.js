import ImplementedProgram from "../models/implementedProgram.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const getImplementedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({ programNumber });
    if (!validImplementedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program Hall does not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data: { implementedProgram: validImplementedProgram } });
  } catch (error) {
    next(error);
  }
};
export const addImplementedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({ programNumber });
    if (validImplementedProgram)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Implemented Program already exist",
      });

    const newImplementedProgram = new ImplementedProgram(req.body);
    await newImplementedProgram.save();

    res
      .status(201)
      .json({ status: "success", data: { implementedProgram: newImplementedProgram } });
  } catch (error) {
    next(error);
  }
};
