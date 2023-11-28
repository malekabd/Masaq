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
        message: "Included Program does not  exist",
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
        message: "Included Program already exist",
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

export const deleteIncludedProgramController = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validUser = await IncludedProgram.findOneAndRemove({ programNumber });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
export const EditIncludedProgram = async (req, res, next) => {
  const { oldProgramNumber, ...rest } = req.body;
  console.log(oldProgramNumber);
  console.log(rest);
  try {
    const validUser = await IncludedProgram.findOneAndUpdate(
      { programNumber: oldProgramNumber },
      rest
    );
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "program does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
