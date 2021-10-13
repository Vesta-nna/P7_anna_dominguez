const auth = require("../middleware/auth");
const profileController = require("../controllers/profile");

const express = require('express')

const router = express.Router()

router.get("/:id", [auth.verifyToken], profileController.getProfile)

router.post("/infos/:id", [auth.verifyToken], profileController.updateProfile)

router.post("/email/:id", [auth.verifyToken], profileController.updateEmail)

router.post("/pwd/:id", [auth.verifyToken], profileController.updatePassword)

router.delete("/:id", [auth.verifyToken], profileController.deleteUserCascade)

module.exports = router
