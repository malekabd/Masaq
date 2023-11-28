import RegistrationOfTrainee from "../models/registrationOfTrainee.js";

export const getRegistrationOfTrainee = async (req, res, next) => {
  const { number } = req.body;
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.findOne({ number }).populate('employeeNumber');
    if (!validRegistrationOfTrainee)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Registration does not  exist",
      });

    res
      .status(200)
      .json({ status: "success", data: { registrationOfTrainee: validRegistrationOfTrainee } });
  } catch (error) {
    next(error);
  }
};

export const getAllRegistrationOfTrainee = async (req, res, next) => {
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.find();
    if (!validRegistrationOfTrainee)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Registration Halls do not  exist",
      });

    res.status(200).json({ status: "success", data: validRegistrationOfTrainee });
  } catch (error) {
    next(error);
  }
};
export const addRegistrationOfTrainee = async (req, res, next) => {
  const { number } = req.body;
  try {
    const validRegistrationOfTrainee = await RegistrationOfTrainee.findOne({ number });
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
      .json({ status: "success", data: { registrationOfTrainee: newRegistrationOfTrainee } });
  } catch (error) {
    next(error);
  }
};
export const EditRegistrationOfTrainee = async (req, res, next) => {
  const { oldNumber, ...rest } = req.body;
  console.log(oldNumber)
  console.log(rest)
  try {
    const validRegistration = await RegistrationOfTrainee.findOneAndUpdate(
      {number: oldNumber },
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
  next(error);
}
};

export const deleteRegistrationOfTrainee = async (req, res, next) => {
  const { number } = req.body;
  try {
    const validRegistration = await RegistrationOfTrainee.findOneAndRemove({ number });
    if (!validRegistration)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Registration does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};