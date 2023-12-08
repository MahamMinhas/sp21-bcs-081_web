// Import the express module
const express = require('express');
const app = express();
const port= 5000;

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
