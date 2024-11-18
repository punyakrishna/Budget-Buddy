const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    gender: {
      type: String,
      validate(value) {
        if (!["Female", "Male", "Others"].includes(value)) {
          throw new error("Gender data is not valid");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "Thisissecret", { expiresIn: "1d" });
};

userSchema.methods.validatePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

module.exports = mongoose.model("User", userSchema);
