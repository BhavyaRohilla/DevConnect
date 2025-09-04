const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { requests, connections, feed } = require("../controller/userController");
const router = express.Router();

router.get("/user/requests/recieved", userAuth, requests);
router.get("/user/connections", userAuth, connections);
router.get("/feed", userAuth, feed);
module.exports = userRouter;
