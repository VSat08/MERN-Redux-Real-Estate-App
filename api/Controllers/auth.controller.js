import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPasword = bcryptjs.hashSync(password, 10);
  const createNewUser = new User({ username, email, password: hashedPasword });

  try {
    await createNewUser.save();

    res.status(201).json("User created successfully !");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
