import ImplementedProgram from "../models/implementedProgram.js";

export const getImplementedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({
      programNumber,
    });
    if (!validImplementedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program  does not  exist",
      });

    res
      .status(200)
      .json({
        status: "success",
        data: { implementedProgram: validImplementedProgram },
      });
  } catch (error) {
    next(error);
  }
};

export const getAllImplementedProgram = async (req, res, next) => {
  try {
    const validImplementedProgram = await ImplementedProgram.find();
    if (!validImplementedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program  do not  exist",
      });

    res
      .status(200)
      .json({
        status: "success",
        data: { implementedProgram: validImplementedProgram },
      });
  } catch (error) {
    next(error);
  }
};

export const addImplementedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({
      programNumber,
    });
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
      .json({
        status: "success",
        data: { implementedProgram: newImplementedProgram },
      });
  } catch (error) {
    next(error);
  }
};


export const EditImplementedProgram = async (req, res, next) => {
  const { oldImplementedProgram, ...rest } = req.body;
  console.log(oldImplementedProgram)
  console.log(rest)
  try {
    const validImplementedProgram = await ImplementedProgram.findOneAndUpdate(
      {programNumber: oldImplementedProgram },
      rest
    );
    if (!validImplementedProgram)
    return res.status(404).json({
  code: "404",
  status: "Fail",
  message: "Implemented Program does not  exist",
});
res.status(202).json({ status: "success" });
} catch (error) {
  next(error);
}
};
export const deleteImplementedProgram = async (req, res, next) => {
  const { programNumber } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOneAndRemove({ programNumber });
    if (!validImplementedProgram)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};