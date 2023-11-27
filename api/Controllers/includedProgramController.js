import IncludedProgram from "../models/includedProgram.js";

export const getIncludedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validIncludedProgram = await IncludedProgram.findOne({
      programNumber,
    });
    if (!validIncludedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Valid Program does not  exist",
      });

    res.status(200).json({
      status: "success",
      data: { includedProgram: validIncludedProgram },
    });
  } catch (error) {
    next(error);
  }
};
export const getAllIncludedProgram = async (req, res, next) => {
  
  try {
    const validIncludedProgram = await IncludedProgram.find();
    if (!validIncludedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Programs do not  exist",
      });

    res.status(200).json({
      status: "success",
      data: { includedProgram: validIncludedProgram },
    });
  } catch (error) {
    next(error);
  }
};
export const addIncludedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validIncludedProgram = await IncludedProgram.findOne({
      programNumber,
    });
    if (validIncludedProgram)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Program already exist",
      });

    const newIncludedProgram = new IncludedProgram(req.body);
    await newIncludedProgram.save();

    res.status(201).json({
      status: "success",
      data: { includedProgram: newIncludedProgram },
    });
  } catch (error) {
    next(error);
  }
};
