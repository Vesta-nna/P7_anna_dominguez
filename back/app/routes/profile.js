const auth = require("../middleware/auth");
const profileController = require("../controllers/profile");

const express = require('express')

const router = express.Router()

router.get("/:id", profileController.getProfile)

router.post("/:id", [auth.verifyToken], profileController.updateProfile)

module.exports = router
