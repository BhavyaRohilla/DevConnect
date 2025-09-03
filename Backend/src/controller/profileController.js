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
