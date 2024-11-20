const express = require("express");
const {
  signUpDataValidation,
  loginValidation,
} = require("../utils/validations");
const { signup, login } = require("../controllers/auth");
const userRouter = express.Router();

userRouter.post("/signUp", signUpDataValidation, signup);

userRouter.post("/login", loginValidation, login);

// userRouter.post("/logout", async (req, res) => {
//   res.cookie("token", null, { expires: new Date(Date.now()) }).send({
//     code: 200,
//     message: "Loggedout succesfully",
//   });
// });

module.exports = userRouter;
