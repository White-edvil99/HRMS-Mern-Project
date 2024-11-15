const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["employee", "admin", "manager"], required: true },
    profileImage: { type: String },

    // Reference to Employee schema (ObjectId)
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", sparse: true, default:null }, // Unique reference to Employee

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the `updatedAt` field automatically on each save
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("User", userSchema);
