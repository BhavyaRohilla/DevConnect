const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest } = require("../controller/requestController"); // destructure liya

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, sendConnectionRequest);

module.exports = router;
