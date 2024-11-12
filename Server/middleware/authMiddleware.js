const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyUser = async (req, res, next) => {
    try {
        console.log("Verifying token...");
        // console.log(req.headers)
        if(!req.headers?.authorization){
            return res.status(404).json({ success: false, error: "Token not provided" });

        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log("Token not provided");
            return res.status(404).json({ success: false, error: "Token not provided" });
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            console.log("Token not valid");
            return res.status(404).json({ success: false, error: "Token not valid" });
        }

        const user = await User.findById({ _id: decoded._id }).select('-password');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Server side error:", error.message);
        return res.status(500).json({ success: false, error: "Server side error" });
    }
};

module.exports = verifyUser;
