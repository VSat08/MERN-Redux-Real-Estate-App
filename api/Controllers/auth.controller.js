import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPasword = bcryptjs.hashSync(password, 10);
  const createNewUser = new User({ username, email, password: hashedPasword });

  try {
    await createNewUser.save();

    res.status(201).json("User created successfully !");
  } catch (err) {
    // res.status(500).json(err.message);
    next(err);
    // next(errorHandler(550,"My personal error"));
  }
};
