const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const requestRouter = require("./routes/requestRoutes");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chat");

// Global Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(helmet()); // Security headers
app.use(cookieParser()); // Parse Cookies

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logging only in dev
}

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

module.exports = app;
