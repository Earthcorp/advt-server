const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@earthcorp.in" });
    if (existingAdmin) {
      console.log("Admin account already exist");
    } else {
      const newAdmin = new User({
        name: "Admin",
        email: "admin@earthcorp.in",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created successfully");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createAdminAccount };
