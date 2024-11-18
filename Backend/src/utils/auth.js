const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies || !cookies.token) {
      return res.status(401).json({
        code: 401,
        message: "Authentication token is missing.",
      });
    }

    const { _id } = jwt.verify(cookies.token, "Thisissecret");

    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).json({
        code: 404,
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "Invalid authentication token.",
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: 401,
        message: "Authentication token has expired.",
      });
    }

    return res.status(500).json({
      code: 500,
      message: "An error occurred during authentication.",
    });
  }
};

module.exports = {
  userAuth,
};
