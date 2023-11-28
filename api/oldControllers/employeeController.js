import Employee from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const getEmployee = async (req, res, next) => {
  const { jobNumber } = req.body;
  try {
    const validEmployee = await Employee.findOne({ jobNumber });
    if (!validEmployee)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Employee does not  exist",
      });
    const { password: pass, ...rest } = validEmployee._doc;

    res.status(200).json({ status: "success", data: { user: rest } });
  } catch (error) {
    next(error);
  }
};
export const getAllEmployee = async (req, res, next) => {
  try {
    const validEmployee = await Employee.find();
    if (!validEmployee)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Employees does not  exist",
      });

    res.status(200).json({ status: "success", data: validEmployee });
  } catch (error) {
    next(error);
  }
};
export const addEmployee = async (req, res, next) => {
  const { jobNumber } = req.body;
  try {
    const validEmployee = await Employee.findOne({ jobNumber });
    if (validEmployee)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Employee already exist",
      });

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    const token = jwt.sign(
      { id: newEmployee._id.toString() },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = newEmployee._doc; //this destructering is to sen the uer data without the encrypted password
    res
      .cookie(process.env.TOKEN_NAME, token, {
        //this is the way how to define a session
        httpOnly: true,
      })
      .status(201)
      .json({ status: "success", token, data: { user: rest } });
  } catch (error) {
    next(error);
  }
};
