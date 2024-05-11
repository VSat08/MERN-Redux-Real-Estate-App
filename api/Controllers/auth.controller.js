import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// sign up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return next(errorHandler(400, "Please Enter complete details"));
  }

  const hashedPasword = bcryptjs.hashSync(password, 10);
  const createNewUser = new User({ username, email, password: hashedPasword });

  try {
    await createNewUser.save();

    res.status(201).json("User created successfully !");
  } catch (err) {
    // res.status(500).json(err.message);
    return next(err);
    // next(errorHandler(550,"My personal error"));
  }
};

// sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(404, "Please fill all the fields"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    return next(err);
  }
};
