const express = require("express");
const router = express.Router();
const { profile, profileEdit } = require("../controller/profileController");
const { userAuth } = require("../middlewares/auth");

router.get("/profile/view", userAuth, profile);
router.patch("/profile/edit", userAuth, profileEdit);

module.exports = router;
