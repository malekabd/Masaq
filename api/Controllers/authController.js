import User from "../models/userModal.js";
import bcryptjs from "bcryptjs";

import JsonWebTokenError from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    const message = `Invalid input data. ${errors.join(". ")}`;
    return errorHandler(message, 400);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler("User not found!", 404));
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler("Invalid credential !", 401));
    }
    const token = JsonWebTokenError.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc; //this destructering is to sen the uer data without the encrypted password
    res
      .cookie("access_token", token, {
        //this is the way how to define a session
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = JsonWebTokenError.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = JsonWebTokenError.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
