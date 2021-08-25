const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = {
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    min: 10,
  },
  designation: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model("User", userSchema);
