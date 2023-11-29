import RegistrationOfTrainee from "../models/registrationOfTrainee.js";

export const getRegistrationOfTrainee = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.findOne({
      _id,
    }).populate("employeeNumber");
    if (!validRegistrationOfTrainee)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Registration does not  exist",
      });

    res
      .status(200)
      .json({
        status: "success",
        data: { registrationOfTrainee: validRegistrationOfTrainee },
      });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const getAllRegistrationOfTrainee = async (req, res, next) => {
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.find();
    if (!validRegistrationOfTrainee)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Registration Halls do not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data: validRegistrationOfTrainee });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const addRegistrationOfTrainee = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.findOne({
      _id,
    });
    if (validRegistrationOfTrainee)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Registration already exist",
      });

    const newRegistrationOfTrainee = new RegistrationOfTrainee(req.body);
    await newRegistrationOfTrainee.save();

    res
      .status(201)
      .json({
        status: "success",
        data: { registrationOfTrainee: newRegistrationOfTrainee },
      });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const EditRegistrationOfTrainee = async (req, res, next) => {
  const { _id, ...rest } = req.body;

  try {
    const validRegistration = await RegistrationOfTrainee.findOneAndUpdate(
      { _id },
      rest
    );
    if (!validRegistration)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Registration does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const deleteRegistrationOfTrainee = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validRegistration = await RegistrationOfTrainee.findOneAndRemove({
      _id,
    });
    if (!validRegistration)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Registration does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
