const verifySignUp = require("../middleware/verifySignUp")
const userController = require("../controllers/user")
const express = require('express')

const router = express.Router()

router.post("/signup", [verifySignUp.checkEmail, verifySignUp.checkRolesExisted], userController.signup)

router.post("/login", userController.login)

module.exports = router