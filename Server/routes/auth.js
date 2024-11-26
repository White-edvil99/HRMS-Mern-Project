const express = require('express');
const { login, verify, refreshToken } = require('../controller/authController');
const verifyUser = require('../middleware/authMiddleware');

const authRouter = express.Router();

// Route for user login
authRouter.post("/login", login);

// Route to verify user token
authRouter.get("/verify", verifyUser, verify);

// Route to refresh access token
authRouter.post("/refresh-token", refreshToken);

module.exports = authRouter;
