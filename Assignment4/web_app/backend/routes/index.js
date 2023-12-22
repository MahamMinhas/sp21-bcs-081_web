User
// routes/index.js

const express = require('express');
const router = express.Router();

// Import other route files
const apiRoutes = require('./apiroutes');
const userRoutes = require('./userRoutes');

// Use the imported route files
router.use('/api', apiRoutes);
router.use('/users', userRoutes);


module.exports = router;