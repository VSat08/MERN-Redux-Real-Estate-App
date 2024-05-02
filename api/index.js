import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js"

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Databse connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => console.log("> Server is up and running on 3000 : "));

app.use("/api/user", userRouter);


