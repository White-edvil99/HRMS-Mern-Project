const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User NOT found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Password does NOT match" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            token,
            refreshToken,
            user: { _id: user._id, name: user.name, role: user.role },
        });
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const verify = async (req, res) => {
    try {
        // console.log("Verifying user...");
        // console.log("User:", req.user);
        return res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const newToken = jwt.sign(
            { _id: decoded._id, role: decoded.role },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ success: true, token: newToken });
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { login, verify, refreshToken };
