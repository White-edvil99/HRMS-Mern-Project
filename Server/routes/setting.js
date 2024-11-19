const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { changePassword } = require("../controller/settingController"); // Corrected import

const router = express.Router();

router.put('/change-password', verifyUser,(req,res,next)=>{
    console.log("setting route hit");
    next();
} ,changePassword);

module.exports = router;
