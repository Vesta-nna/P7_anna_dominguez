const auth = require("../middleware/auth");
const roleController = require("../controllers/role");

const express = require('express')

const router = express.Router()

router.get("/all", roleController.allAccess)

router.get("/user", [auth.verifyToken], roleController.userBoard)

router.get("/mod", [auth.verifyToken, auth.isModeratorOrAdmin], roleController.moderatorBoard)

router.get("/admin",[auth.verifyToken, auth.isAdmin], roleController.adminBoard)

module.exports = router