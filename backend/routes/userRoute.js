const express = require("express")
const asynHandler = require("express-async-handler");

const router = express.Router();
const {createUser,loginUser,currentUser, getProfile,sendOtp} = require("../controller/userControll");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", createUser);
router.post("/register/sendOtp",sendOtp)
router.post("/login", loginUser);

router.get("/current",validateToken, currentUser);
router.post("/profile",getProfile);
module.exports = router;