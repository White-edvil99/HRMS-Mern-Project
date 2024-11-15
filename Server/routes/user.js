const express = require('express');
const {addUser,getUserByRole } = require('../controller/userController');

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.get("/role/:role", getUserByRole);


module.exports = userRouter;
