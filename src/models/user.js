const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is invalid");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2013/07/12/16/36/man-151216_640.png",
    },
    about: {
      type: String,
      default: "This is a default About the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
