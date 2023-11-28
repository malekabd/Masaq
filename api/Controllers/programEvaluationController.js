import ProgramEvaluation from "../models/programEvaluation.js";

export const getProgramEvaluation = async (req, res, next) => {
  const { evaluationNumber } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      evaluationNumber,
    });
    if (!validProgramEvaluation)
      return res.status(404).json({
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
    next(error);
  }
};

export const addProgramEvaluation = async (req, res, next) => {
  const { evaluationNumber } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOne({
      evaluationNumber,
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


export const EditProgramEvaluation = async (req, res, next) => {
  const { oldEvaluationNumber, ...rest } = req.body;
  console.log(oldEvaluationNumber)
  console.log(rest)
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOneAndUpdate(
      {evaluationNumber: oldEvaluationNumber  },
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
  res.status(500).json({ status: "fail", message:error.message });
  next();
}
};

export const deleteProgramEvaluation = async (req, res, next) => {
  const { evaluationNumber } = req.body;
  try {
    const validProgramEvaluation = await ProgramEvaluation.findOneAndRemove({ evaluationNumber });
    if (!validProgramEvaluation)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Program Evaluation does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};