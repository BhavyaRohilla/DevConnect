exports.sendConnectionRequest = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    console.log(`${user.firstName} is sending a connection request`);

    return res.status(200).json({
      success: true,
      message: `${user.firstName} sent a connection request`,
    });
  } catch (err) {
    console.error("Error in sendConnectionRequest:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send connection request",
      error: err.message,
    });
  }
};
