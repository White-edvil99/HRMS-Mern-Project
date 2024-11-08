const express = require('express');
const {login, verify} = require('../controller/authController');
const verifyUser = require('../middleware/authMiddleware');
// const { verify } = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/verify", verifyUser, verify);

module.exports = authRouter;
