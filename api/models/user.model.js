import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://assets-global.website-files.com/5d5e2ff58f10c53dcffd8683/5db1e0e047495f76fd1904e9_doggie.gif",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
