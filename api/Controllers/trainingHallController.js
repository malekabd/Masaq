import TrainingHall from "../models/trainingHall.js";

export const getTrainingHall = async (req, res, next) => {
  const { hallNumber } = req.body;
  try {
    const validTrainingHall = await TrainingHall.findOne({ hallNumber });
    if (!validTrainingHall)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Training Hall does not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data: { trainingHall: validTrainingHall } });
  } catch (error) {
    next(error);
  }
};
export const getAllTrainingHall = async (req, res, next) => {
  
  try {
    const validTrainingHall = await TrainingHall.find();
    if (!validTrainingHall)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Training Halls do not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data:  validTrainingHall });
  } catch (error) {
    next(error);
  }
};
export const addTrainingHall = async (req, res, next) => {
  const { hallNumber } = req.body;
  try {
    const validTrainingHall = await TrainingHall.findOne({ hallNumber });
    if (validTrainingHall)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Training Hall already exist",
      });

    const newTrainingHall = new TrainingHall(req.body);
    await newTrainingHall.save();

    res
      .status(201)
      .json({ status: "success", data: { trainingHall: newTrainingHall } });
  } catch (error) {
    next(error);
  }
};
