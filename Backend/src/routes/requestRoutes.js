const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  sendConnectionRequest,
  reviewRequest,
} = require("../controller/requestController"); // destructure liya

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, sendConnectionRequest);
router.post("/request/review/:status/:requestId", userAuth, reviewRequest);

module.exports = router;
