const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose schema for your collection
const yourSchema = new mongoose.Schema({
    name: String,
    description: String,
    // ... other fields
});

// Create a mongoose model based on the schema
const YourModel = mongoose.model('YourModel', yourSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new record
app.post('/create', async (req, res) => {
    try {
        const { name, description } = req.body;

        // Create a new record
        const newRecord = new YourModel({
            name,
            description,
            // ... other fields
        });

        // Save the record to the database
        const savedRecord = await newRecord.save();

        res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all records
app.get('/read', async (req, res) => {
    try {
        // Retrieve all records from the database
        const allRecords = await YourModel.find();

        res.status(200).json(allRecords);
    } catch (error) {
        console.error('Error retrieving records:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a record
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Find the record by ID and update it
        const updatedRecord = await YourModel.findByIdAndUpdate(id, { name, description });

        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a record
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the record by ID and delete it
        const deletedRecord = await YourModel.findByIdAndDelete(id);

        res.status(200).json(deletedRecord);
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
