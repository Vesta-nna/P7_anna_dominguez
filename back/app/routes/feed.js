const auth = require("../middleware/auth");
const feedController = require("../controllers/feed");

const express = require('express')

const router = express.Router()

router.get("/all", [auth.verifyToken], feedController.getAllPosts)

router.post("/", [auth.verifyToken], feedController.createPost)

router.delete("/:id", [auth.verifyToken], feedController.deletePost)

module.exports = router
