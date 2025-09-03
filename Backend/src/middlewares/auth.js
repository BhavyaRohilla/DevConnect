const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // 1. Extract token from cookies or Authorization header (flexibility)
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
      const [bearer, value] = req.headers.authorization.split(" ");
      if (bearer === "Bearer") token = value;
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3. Find user
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Attach user to request
    req.user = user;

    // 5. Continue
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  userAuth,
};
