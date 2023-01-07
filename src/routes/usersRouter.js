const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("../controllers/userController");
const { validateLogin } = require("../../validator/userValidator");

router.post("/register",registerUser);


router.post('/login', validateLogin,loginUser);
  
module.exports = router;
