const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  generateToken,
  verifyToken,
  generateRefreshToken,
} = require("../utils/authUtils");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ message: message.error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = generateToken(user);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { oldToken } = req.body;
    const decodedToken = verifyToken(oldToken);
    const existingUser = await User.findById(decodedToken.id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const newToken = generateRefreshToken(existingUser);
    res.json({ token: newToken });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { registerController, loginController, refreshToken };
