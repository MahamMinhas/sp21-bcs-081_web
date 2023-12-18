const express = require('express');
const app = express();
const path = require('path');
const Register = require("./models/schema");
const User = require("./models/Userschema"); 
const multer = require('multer');
const upload = multer(); 
const bcrypt = require('bcrypt'); 
require("./db/connect");

const port = 8888;
const static_path = path.join(__dirname, '..', 'public'); 

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/structure.html'));
});

app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve user from the database based on email
        const user = await User.findOne({ email });

        // Compare hashed password
        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Redirect to the home page after successful login
                res.redirect("/");
            } else {
                // Show an alert and redirect to the signup page
                res.send('<script>alert("Invalid credentials. User not found."); window.location = "/signup";</script>');
            }
        } else {
            // Redirect to the sign-up page if the user is not found
            res.redirect("/signup");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send("Internal Server Error");
    }
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
            preferredTime,
            day,
            service,
            message,
            password
        } = req.body;

        // Check if required fields for sign up are present
        if (!firstName || !lastName || !email) {
            return res.status(400).send("Missing required fields for sign up");
        }

        // If password is provided, hash it and save the user
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user using the User model
            const newUser = new User({
                email,
                password: hashedPassword
            });

            // Save the new user to the database
            const user = await newUser.save();

            console.log("User registered:", user);
        }

        // Create a new appointment using the Register model
        const newAppointment = new Register({
            firstName,
            lastName,
            email,
            contactNumber,
            areaCode,
            preferredTime,
            day,
            service,
            message
        });

        // Save the new appointment to the database
        const appointment = await newAppointment.save();

        console.log("Appointment registered:", appointment);

        // Redirect to the home page after successful registration
        res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).send("Error creating user");
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

console.log(__dirname);
