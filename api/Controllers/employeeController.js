import Employee from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const getEmployee = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validEmployee = await Employee.findOne({ _id });
    if (!validEmployee)
      return res.status(409).json({
        code: "404",
        status: "Fail",
        message: "Employee does not  exist",
      });
    const { password: pass, ...rest } = validEmployee._doc;

    res.status(200).json({ status: "success", data: { user: rest } });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
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

    res
      .status(200)
      .json({ status: "success", data: { employee: validEmployee } });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};

export const addEmployee = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const validEmployee = await Employee.findOne({ _id });
    if (validEmployee)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Employee already exist",
      });

    const newEmployee = new Employee(req.body);
    await newEmployee.save();

    //const { password: pass, ...rest } = newEmployee._doc; //this destructering is to sen the uer data without the encrypted password
    res
      .status(201)
      .json({ status: "success", data: { employee: newEmployee } });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });

    next();
  }
};
export const EditEmployee = async (req, res, next) => {
  const { _id, ...rest } = req.body;
  console.log(_id);
  console.log(rest);
  try {
    const validUser = await Employee.findOneAndUpdate({ _id }, rest);
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Employee  does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const deleteEmployee = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const validUser = await Employee.findOneAndRemove({ _id });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Employee does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
