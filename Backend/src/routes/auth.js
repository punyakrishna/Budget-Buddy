const express = require("express");
const bcrypt = require("bcrypt");
const {
  signUpDataValidation,
  loginValidation,
} = require("../utils/validations");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.post("/signUp", signUpDataValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        error: "User already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({
      code: 200,
      message: "User added successfully.",
    });
  } catch (err) {
    console.error("Signup error: ", err.message);
    res.status(500).json({
      code: 500,
      error: "Something went wrong. Please try again later.",
    });
  }
});

userRouter.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        code: 404,
        message: "User not found. Please sign up.",
      });
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        code: 400,
        message: "Invalid password. Please try again.",
      });
    }

    const authToken = user.getJWT();
    // res.cookie("token", token);
    return res.status(200).json({
      code: 200,
      message: "Login successful!",
      authToken,
    });
  } catch (err) {
    console.log("Login error: ", err);
    res.status(500).json({
      code: 500,
      error: "Something went wrong. Please try again later.",
    });
  }
});

userRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }).send({
    code: 200,
    message: "Loggedout succesfully",
  });
});

module.exports = userRouter;
