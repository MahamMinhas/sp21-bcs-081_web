const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  areaCode: String,
  preferredPhysio: String,
  preferredTime: String,
  day: String,
  service: String,
  message: String
});

const Register = mongoose.model('Register', appointmentSchema);
module.exports = Register;
