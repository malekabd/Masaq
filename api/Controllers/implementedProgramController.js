import ImplementedProgram from "../models/implementedProgram.js";

export const getImplementedProgram = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({
      _id,
    });
    if (!validImplementedProgram)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program  does not  exist",
      });

    res.status(200).json({
      status: "success",
      data: { implementedProgram: validImplementedProgram },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
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

    res.status(200).json({
      status: "success",
      data: { implementedProgram: validImplementedProgram },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};

export const addImplementedProgram = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOne({
      _id,
    });
    if (validImplementedProgram)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Implemented Program already exist",
      });

    const newImplementedProgram = new ImplementedProgram(req.body);
    await newImplementedProgram.save();

    res.status(201).json({
      status: "success",
      data: { implementedProgram: newImplementedProgram },
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};

export const EditImplementedProgram = async (req, res, next) => {
  const { _id, ...rest } = req.body;

  try {
    const validImplementedProgram = await ImplementedProgram.findOneAndUpdate(
      { _id },
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
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
export const deleteImplementedProgram = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validImplementedProgram = await ImplementedProgram.findOneAndRemove({
      _id,
    });
    if (!validImplementedProgram)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Implemented Program does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
