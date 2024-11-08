const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, enum:["employee","admin"], required:true},
    profileImage: String,
    createAt: {type: Date, default: Date.now()},
    updatedAt:{type: Date, default: Date.now()}
})

module.exports = mongoose.model("User", userSchema);