require('dotenv').config();

const express = require('express');

// uploadController for handling file uploads
const uploadController = require('./controllers/uploadController');

const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Using the uploadController for handling file uploads
app.post('/upload', uploadController);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
