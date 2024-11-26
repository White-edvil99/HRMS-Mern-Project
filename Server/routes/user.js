const express = require('express');
const {addUser,getUserByRole,changePasswordById } = require('../controller/userController');

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.get("/role/:role", getUserByRole);
userRouter.put("/change-password/:id", changePasswordById);


module.exports = userRouter;
