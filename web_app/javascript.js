const express = require('express');
const path = require('path'); // Import the path module

const app = express();

// Serve static files from the same directory as this script
app.use(express.static(__dirname));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'structure.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
