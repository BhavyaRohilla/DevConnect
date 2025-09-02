const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");

// Global Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logging only in dev
}

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    // Send response (excluding password)
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        emailId: user.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error saving the user",
      error: err.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error saving the user",
      error: err.message,
    });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const user = await User.findOne({ emailID: userEmail });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(400).send("Something wen wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = app;
