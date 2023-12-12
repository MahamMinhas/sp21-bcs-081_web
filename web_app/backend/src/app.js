//this file is for server 
// Import the express module
const express = require('express');
const app = express();
const port= 5000;
const path=require("path");
require("./db/connect")

const static_path = path.join(__dirname, './public')
app.use(express.static(static_path))

console.log(__dirname)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "backend/public/structure.html"));
});
// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

