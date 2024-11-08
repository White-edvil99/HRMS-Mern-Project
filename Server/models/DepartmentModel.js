const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  dep_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
