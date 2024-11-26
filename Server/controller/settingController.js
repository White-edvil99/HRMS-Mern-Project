// const Setting = require("../models/Setting");

const { response } = require("express");
const User = require("../models/User");
// const bcrypt from 'bcrypt'
const bcrypt = require("bcrypt");


const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        console.log("setting response",userId,oldPassword)
        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({ success: false, error: "user not found" })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "wrong password" })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10)
        const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword })
        newUser.save();
        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: "setting error" })
    }
}


module.exports = {
    changePassword
};