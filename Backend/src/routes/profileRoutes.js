const express = require("express");
const router = express.Router();
const { profile } = require("../controller/profileController");
const { userAuth } = require("../middlewares/auth");

router.get("/profile", userAuth, profile);

module.exports = router;
