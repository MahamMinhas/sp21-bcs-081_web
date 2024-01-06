// routes/apiRoutes.js

const express = require('express');
const router = express.Router();
const Register = require("../models/schema");
const User = require("../models/Userschema");

// Fetch All Appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Register.find();
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch Single Appointment
router.get('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Register.findById(req.params.id);
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ error: "Appointment not found" });
        }
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Authentication Status
router.get('/auth/status', (req, res) => {
    // Implement your authentication status logic here
    const isAuthenticated = /* Your authentication logic here */;
    res.json({ isAuthenticated });
});

// User Profile
router.get('/user/profile', async (req, res) => {
    try {
        // Extract user ID from the authenticated user's session or token
        const userId = /* Your logic to get the user ID */;
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
