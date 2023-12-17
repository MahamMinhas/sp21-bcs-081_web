const express = require('express');
const app = express();
const path = require('path');
const Register = require("./models/schema");
const multer = require('multer');
const upload = multer(); // Initialize multer
require("./db/connect");

const port = 8888;
const static_path = path.join(__dirname,'..' ,'public'); // Corrected static path

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/structure.html'));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/welcome.html'));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/services.html'));
});
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contactform.html'));
});

app.post("/register", upload.none(), async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const {
            firstName,
            lastName,
            email,
            contactNumber,
            areaCode,
            preferredPhysio,
            preferredTime,
            preferredDay,
            service,
            message
        } = req.body;

        // Create a new user using the Register model
        const newUser = new Register({
            firstName,
            lastName,
            email,
            contactNumber,
            areaCode,
            preferredPhysio,
            preferredTime,
            preferredDay,
            service,
            message
        });

        // Save the new user to the database
        const register = await newUser.save();

        console.log("User registered:", register);

        // Send a success response
        res.status(201).sendFile(path.join(__dirname, '../public/contactform.html'));
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).send("Error creating user");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
console.log(__dirname);