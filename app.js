const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./configuration/dbConfig");
const authRoutes = require("./routes/authRoute");
const authenticateRoute = require("./routes/Authenticated");
const { createAdminAccount } = require("./scripts/setup");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// server test
app.get("/", (req, res) => {
  res.status(200).json("Server running");
});

createAdminAccount();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth", authenticateRoute);

// mongodb connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`);
});
