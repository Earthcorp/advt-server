const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");
const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ messsage: "'User not found'" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin, isUser };
