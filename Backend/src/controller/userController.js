const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age about skills";

// 📌 Get all pending requests for logged-in user
exports.requests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // ✅ Use `find` (not findOne) → user can have multiple requests
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    return res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    console.error("Error in requests:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
      error: err.message,
    });
  }
};

// 📌 Get all accepted connections for logged-in user
exports.connections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // ✅ Find all connections where loggedInUser is either sender/receiver
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // ✅ Map only the "other" user
    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    return res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("Error in connections:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch connections",
      error: err.message,
    });
  }
};

exports.feed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // 📌 Pagination setup
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    let limit = Math.min(parseInt(req.query.limit) || 10, 50); // max 50
    const skip = (page - 1) * limit;

    // 📌 Find all requests involving logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // 📌 Collect all users to hide (already requested/connected + self)
    const hideUsersFromFeed = new Set([loggedInUser._id.toString()]);
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    // 📌 Fetch feed users
    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit)
      .lean(); // ⚡ lean() for performance

    // 📌 Total count for pagination
    const totalUsers = await User.countDocuments({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    });

    return res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("Error in feed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch feed",
      error: err.message,
    });
  }
};
