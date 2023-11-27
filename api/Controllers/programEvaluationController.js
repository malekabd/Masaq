import ProgramEvaluation from "../models/programEvaluation.js";

export const getProgramEvaluation = async (req, res, next) => {
  const { executedProgramNumber } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      executedProgramNumber,
    });
    if (!validProgramEvaluation)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Program Evaluation does not  exist",
      });

    res
      .status(200)
      .json({
        status: "success",
        data: { programEvaluation: validProgramEvaluation },
      });
  } catch (error) {
    next(error);
  }
};
export const addProgramEvaluation = async (req, res, next) => {
  const { executedProgramNumber } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      executedProgramNumber,
    });
    if (validProgramEvaluation)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Program Evaluation already exist",
      });

    const newProgramEvaluation = new ProgramEvaluation(req.body);
    await newProgramEvaluation.save();

    res
      .status(201)
      .json({
        status: "success",
        data: { programEvaluation: newProgramEvaluation },
      });
  } catch (error) {
    next(error);
  }
};
