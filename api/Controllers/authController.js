import User from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  try {
    const validUserName = await User.findOne({ username });
    if (validUserName)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "User Name already exist",
      });
    const validEmailUser = await User.findOne({ email });
    if (validEmailUser)
      return res
        .status(409)
        .json({ code: "409", status: "Fail", message: "Email already exist" });
    if (password != passwordConfirm) {
      console.log(password, passwordConfirm);
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "Password is not matched",
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id.toString() },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = newUser._doc; //this destructering is to sen the uer data without the encrypted password
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Email does not  exist",
      });
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res
        .status(404)
        .json({ code: "404", status: "Fail", message: "UWrong Credentials" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc; //this destructuring is to sen the uer data without the encrypted password
    res
      .cookie("access_token", token, {
        //this is the way how to define a session
        httpOnly: true,
      })
      .status(200)
      .json({ status: "success", token, data: { user: rest } });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ status: "success", token, data: { user: rest } });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ status: "success", token, data: { user: rest } });
    }
  } catch (error) {
  
    next(error);
  }
};
export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.cookie.startsWith(process.env.TOKEN_NAME)) {
      token = req.headers.cookie.split("=")[1]+0;
    }
    if (!token) {
      res.status(401).json({ message: "Unauthorized access" });
      next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
    if (!freshUser) {
      res
        .status(403)
        .json({ message: "The user belonging to this token does not exist" });
    }
    next();
  } catch (error) {
    res.status(403 ).json({ message:error.message });
    next()
  }
};
