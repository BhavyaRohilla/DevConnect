const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest } = require("../controller/profileController"); // destructure liya

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, sendConnectionRequest);

module.exports = router;
