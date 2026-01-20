const express = require("express");
const { logon, hello } = require("../controllers/main");
const protectedAuthMiddleware = require("../middleware/auth.js");

const router = express.Router();

// Private routes
router.route("/hello").get(protectedAuthMiddleware, hello);

// Public routes
router.route("/logon").post(logon);

module.exports = router;
