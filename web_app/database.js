const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect("mongodb://0.0.0.0.27017/CRUD", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define a mongoose schema for your data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Create a mongoose model based on the schema
const DataModel = mongoose.model('Data', userSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (CSS and client-side JS)
app.use(express.static(__dirname));

// Handle form submissions via POST
app.post('/submit-form', async (req, res) => {
  console.log('Received form submission:', req.body);

  // Rest of your code...
});

app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new instance of the model with form data
  const newData = new DataModel({ name, email, message });

  try {
    // Save the new data to MongoDB
    const savedData = await newData.save();
    console.log("Data saved successfully:", savedData);
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'src/public/contactus.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});