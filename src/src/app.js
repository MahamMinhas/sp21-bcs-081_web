const express = require("express");
const app = express();
const path = require("path");
require("./db/corn");
const Register = require("./model/registers");
const { json } = require("express");
const port = process.env.PORT || 9000;

console.log(__dirname);

const static_path = path.join(__dirname, "./public");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/bootstraptask.html"));
});
app.get("/API", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/API.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contactus.html"));
});


// Assuming you have a view engine set up, otherwise you need to set up one.
app.get("/register", (req, res) => {
  res.render("register"); // Fix the typo in the template name
});

// Create a new user
app.post("/register", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new user using the Register model
    const newUser = new Register({
      name,
      email,
      message,
    });

    // Save the new user to the database
    const register = await newUser.save();

    // Send a success response
    res.status(201).sendFile(path.join(__dirname, "public/contactus.html"));
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(400).send("Error creating user");
  }
});

app.listen(port, () => {
  console.log(`My server running at port no ${port}`);
});
