import TrainingHall from "../models/trainingHall.js";

export const getTrainingHall = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validTrainingHall = await TrainingHall.findOne({ _id });
    if (!validTrainingHall)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Training Hall does not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data: { trainingHall: validTrainingHall } });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const getAllTrainingHall = async (req, res, next) => {
  try {
    const validTrainingHall = await TrainingHall.find();
    if (!validTrainingHall)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Training Halls do not  exist",
      });

    res.status(200).json({ status: "success", data: validTrainingHall });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
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
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
export const EditTrainingHall = async (req, res, next) => {
  const { _id, ...rest } = req.body;
  console.log(_id);
  console.log(rest);
  try {
    const validTrainingHall = await TrainingHall.findOneAndUpdate(
      { _id },
      rest
    );
    if (!validTrainingHall)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Training Hall does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const deleteTrainingHall = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validUser = await TrainingHall.findOneAndRemove({ _id });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Training Hall does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
