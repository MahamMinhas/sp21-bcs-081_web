const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define a User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // Hash the password with a salt
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
