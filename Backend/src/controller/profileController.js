const { validateEditProfileData } = require("../utils/validation");

exports.profile = async (req, res) => {
  try {
    const user = req.user; // userAuth middleware se aayega
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error fetching profile",
      error: err.message,
    });
  }
};

exports.profileEdit = async (req, res) => {
  try {
    // Validate incoming data
    if (!validateEditProfileData(req)) {
      return res.status(400).json({
        success: false,
        message: "Invalid edit request",
      });
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        bio: loggedInUser.bio,
        location: loggedInUser.location,
        emailId: loggedInUser.emailId, // usually not editable but can be returned
      },
    });
  } catch (err) {
    console.error("Profile edit error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: err.message,
    });
  }
};
