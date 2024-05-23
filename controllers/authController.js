const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const secretKey = require("../configuration/jwtConfig");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, photo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      photo,
    });

    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    // const { role, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      // data: { ...rest },
      // role,
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
    console.log(error);
  }
};

const checkUserController = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  checkUserController,
};
