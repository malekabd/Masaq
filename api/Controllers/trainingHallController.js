import TrainingHall from "../models/trainingHall.js";

export const getTrainingHall = async (req, res, next) => {
  const { hallNumber } = req.body;
  try {
    const validTrainingHall = await TrainingHall.findOne({ hallNumber });
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
    next(error);
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
export const EditTrainingHall = async (req, res, next) => {
  const { oldHallNumber, ...rest } = req.body;
  console.log(oldHallNumber)
  console.log(rest)
  try {
    const validUser = await TrainingHall.findOneAndUpdate(
      {hallNumber: oldHallNumber },
      rest
    );
    if (!validUser)
    return res.status(404).json({
  code: "404",
  status: "Fail",
  message: "Training Hall does not  exist",
});
res.status(202).json({ status: "success" });
} catch (error) {
  next(error);
}
};

export const deleteTrainingHall = async (req, res, next) => {
  const { hallNumber } = req.body;
  try {
    const validUser = await TrainingHall.findOneAndRemove({ hallNumber });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Training Hall does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};