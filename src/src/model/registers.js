const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, // Note: 'String' should be capitalized
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("Customer", userSchema);
module.exports = Register;
