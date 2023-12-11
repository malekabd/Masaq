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
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
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
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const addIncludedProgram = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validIncludedProgram = await IncludedProgram.findOne({
      _id,
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
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const deleteIncludedProgramController = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validUser = await IncludedProgram.findOneAndRemove({ _id });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
export const EditIncludedProgram = async (req, res, next) => {
  const { _id, ...rest } = req.body;

  try {
    const newIncludedProgram = await IncludedProgram.findOneAndUpdate(
      { _id },
      rest
    );
    if (!newIncludedProgram)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program does not  exist",
      });
    res.status(202).json({
      status: "success",
      data: { includedProgram: newIncludedProgram },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
