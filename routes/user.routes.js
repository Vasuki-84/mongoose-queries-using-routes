const express = require("express");
const router = express.Router();
const  { loginUser, registerAPI} = require("../Controller/user.controller");


// http://localhost:8081/auth/register
router.post("/register",registerAPI);

// http://localhost:8081/auth/login
router.post("/login",loginUser);

module.exports = router;