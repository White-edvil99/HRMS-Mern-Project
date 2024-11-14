const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { changePassword } = require("../controller/settingController"); // Corrected import

const router = express.Router();

router.put('/change-password', verifyUser, changePassword);

module.exports = router;
