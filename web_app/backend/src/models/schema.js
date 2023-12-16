const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String, 
    required: true,
  },
  areaCode: {
    type: String,
    required: true,
  },
  preferredPhysio: {
    type: String,
    default: '',
  },
  preferredTime: {
    type: String,
    required: true,
  },
  preferredDay: {
    type: String,
    required: true,
  },
  service: {
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
