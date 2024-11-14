const express = require("express");
const { getSummary } = require("../controller/dashboardController");
const verifyUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyUser, getSummary);

module.exports = router;
