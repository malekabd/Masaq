import Employee from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/* export const signup = async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  try {
    const validUserName = await Employee.findOne({ username });
    if (validUserName)
      return res.status(409).json({
        code: "409",
        status: "Fail",
        message: "User Name already exist",
      });
    const validEmailUser = await Employee.findOne({ email });
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
    const newUser = new Employee({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id.toString() },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = newUser._doc; //this destructering is to sen the uer data without the encrypted password
    res
      .cookie(process.env.TOKEN_NAME, token, {
            { maxAge: 60 * 60 * 24 * 365 * 1000 },
        httpOnly: true,
      })
      .status(201)
      .json({ status: "success", token, data: { user: rest } });
  } catch (error) {
    next(error);
  }
};
 */
export const login = async (req, res, next) => {
  const { jobNumber, password } = req.body;
  //console.log(jobNumber, password);

  try {
    const validUser = await Employee.findOne({ jobNumber });
    if (!validUser)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "User does not  exist",
      });
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res
        .status(404)
        .json({ code: "404", status: "Fail", message: "Wrong Credentials" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    let adminToken = "";
    let traineeToken = "";
    let trainerToken = "";
    if (validUser.admin === "true") {
      adminToken = jwt.sign({ admin: validUser.admin }, process.env.JWT_SECRET);
    }
    if (validUser.trainee === "true") {
      traineeToken = jwt.sign(
        { trainee: validUser.trainee },
        process.env.JWT_SECRET
      );
    }
    if (validUser.trainer === "true") {
      trainerToken = jwt.sign(
        { trainer: validUser.trainer },
        process.env.JWT_SECRET
      );
    }
    const { password: pass, ...rest } = validUser._doc; //this destructuring is to sen the uer data without the encrypted password
    res
      .cookie(
        "access_token",
        token,
        { maxAge: 60 * 60 * 24 * 365 * 1000 },
        {
          //this is the way how to define a session
          httpOnly: true,
        }
      )

      .status(200)
      .json({
        status: "success",
        token,
        roleTokens: {
          admin: adminToken,
          trainer: trainerToken,
          trainee: traineeToken,
        },
        data: { user: rest },
      });
  } catch (error) {
    next(error);
  }
};

/* export const google = async (req, res, next) => {
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
        .cookie("access_token", token,    { maxAge: 60 * 60 * 24 * 365 * 1000 }, { httpOnly: true })
        .status(200)
        .json({ status: "success", token, data: { user: rest } });
    }
  } catch (error) {
  
    next(error);
  }
}; */
export const protect = async (req, res, next) => {
  try {
    let token;
    if (!req.headers.cookie) {
      res.status(401).json({ message: "Unauthorized access" });
      next();
    }
    if (req.headers.cookie.startsWith(process.env.TOKEN_NAME)) {
      token = req.headers.cookie.split("=")[1];
    }
    if (!token) {
      res.status(401).json({ message: "Unauthorized access" });
      next();
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const freshUser = await Employee.findById(decoded.id);
    if (freshUser.admin != "true") {
      return res.status(403).json({
        message: "You don't have access to this route",
      });
    }
    if (freshUser.admin == "true") {
      next();
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
    next();
  }
};
