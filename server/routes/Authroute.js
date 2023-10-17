const express = require("express");

const router = express.Router();

//Controllers
const registerController = require("../controller/RegisterUser");
const Login = require("../controller/UserLogin");
const verify = require("../controller/Verify");

//Routes for authentications
router.post("/register", registerController);
router.post("/login", Login);
router.post("/verify", verify);

module.exports = router;
