const express = require("express");

const UserController = require("../controllers/user");

const checkAuth = require("../middleware/check-auth");

const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.post("/upload", checkAuth, extractFile, UserController.uploadResume);

module.exports = router;
