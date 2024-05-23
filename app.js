const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./configuration/dbConfig");
const authRoute = require("./routes/authRoute");
const advtRoute = require("./routes/advtRoute");
const adminRoute = require("./routes/adminRoute");
const { createAdminAccount } = require("./scripts/setup");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://dashboard.earthcorp.in"],
  })
);

// server test
app.get("/", (req, res) => {
  res.status(200).json("Server running");
});

createAdminAccount();

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/advt", advtRoute);
app.use("/api/v1/admin", adminRoute);

// mongodb connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`);
});
