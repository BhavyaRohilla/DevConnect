const mongoose = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

exports.sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.status(400).json({ message: "Invalid UserId format" });
    }

    // ✅ Allowed status check
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid status type: ${status}` });
    }

    // ✅ Check if target user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!!" });
    }

    // ✅ Check existing request (either direction)
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection Request already exists!!" });
    }

    // ✅ Save new request
    const connectionRequest = await ConnectionRequest.create({
      fromUserId,
      toUserId,
      status,
    });

    // const data = await connectionRequest.save();

    res.json({
      message: "Connection Request Sent Successfully",
      data,
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

exports.reviewRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid requestId format" });
    }

    // ✅ Allowed status check
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed" });
    }

    // ✅ Find request which is still in "interested" state
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested", // fixed typo
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "Connection request not found or already reviewed" });
    }

    // ✅ Update status
    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({
      success: true,
      message: `Connection request ${status}`,
      data,
    });
  } catch (err) {
    console.error("Error in reviewRequest:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to review connection request",
      error: err.message,
    });
  }
};
