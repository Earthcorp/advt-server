const User = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.role == "admin") {
      return res.status(409).json({ message: "Admin can't delete yourself" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

module.exports = { getUserController, deleteUserController };
