const express = require('express');
const { login, verify, refreshToken } = require('../controller/authController');
const verifyUser = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/verify", verifyUser, verify);
authRouter.post("/refresh-token", refreshToken);

module.exports = authRouter;
