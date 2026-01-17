const express = require("express");
const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

// Private routes
router.route("/dashboard").get(authMiddleware, dashboard);

// Public routes
router.route("/login").post(login);

module.exports = router;
