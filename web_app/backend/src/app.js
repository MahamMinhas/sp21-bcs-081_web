const express = require('express');
const app = express();
const path = require('path');
const Register = require("./models/schema");
const { json } = require("express");
require("./db/connect");

const port = process.env.PORT || 5000;

console.log(__dirname);

const static_path = path.join(__dirname, './public');
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/structure.html"));
});

// Assuming you have a view engine set up, otherwise, you need to set up one.
app.get("/register", (req, res) => {
  res.render("register"); // Fix the typo in the template name
});

// Create a new user
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, contactNumber, areaCode, preferredTime, preferredDay, service, message } = req.body;

    // Create a new user using the Register model
    const newUser = new Register({
      firstname,
      lastname,
      email,
      contactNumber,
      areaCode,
      preferredTime,
      preferredDay,
      service,
      message
    });

    // Save the new user to the database
    const register = await newUser.save();

    // Send a success response
    res.status(201).sendFile(path.join(__dirname, "public/contactform.html"));
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(400).send("Error creating user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
