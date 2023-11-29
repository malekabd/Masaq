import ProgramEvaluation from "../models/programEvaluation.js";

export const getProgramEvaluation = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      _id,
    });
    if (!validProgramEvaluation)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program Evaluation does not  exist",
      });

    res.status(200).json({
      status: "success",
      data: { programEvaluation: validProgramEvaluation },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const getAllProgramEvaluation = async (req, res, next) => {
  try {
    const validProgramEvaluation = await ProgramEvaluation.find();
    if (!validProgramEvaluation)
      return res.status(404).json({
        code: "409",
        status: "Fail",
        message: "Program Evaluation do not  exist",
      });

    res.status(200).json({ status: "success", data: validProgramEvaluation });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const addProgramEvaluation = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      _id,
    });
    if (validProgramEvaluation)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Program Evaluation already exist",
      });

    const newProgramEvaluation = new ProgramEvaluation(req.body);
    await newProgramEvaluation.save();

    res.status(201).json({
      status: "success",
      data: { programEvaluation: newProgramEvaluation },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const EditProgramEvaluation = async (req, res, next) => {
  const { _id, ...rest } = req.body;

  try {
    const validProgramEvaluation = await ProgramEvaluation.findOneAndUpdate(
      { _id },
      rest
    );
    if (!validProgramEvaluation)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program Evaluation does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: "Bad Request", message: error.message });
    next();
  }
};

export const deleteProgramEvaluation = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOneAndRemove({
      _id,
    });
    if (!validProgramEvaluation)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program Evaluation does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
