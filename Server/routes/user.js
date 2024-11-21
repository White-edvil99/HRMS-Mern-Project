const express = require('express');
const {addUser,getUserByRole,changePasswordById } = require('../controller/userController');

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.get("/role/:role", getUserByRole);
userRouter.put("/change-password/:userId", changePasswordById);


module.exports = userRouter;
