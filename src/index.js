// Importing the express module
const express = require('express');

// Importing the app instance from the app.js file
const app = require('./app.js');

// Importing the mongoose module
const mongoose = require('mongoose');

// Setting the port number
// const port = 3000;
const port = process.env.PORT || 3000;

//Configuring env file
require("dotenv").config(); 

// Middleware to parse JSON bodies and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to the MongoDB database
// const DATABASE_URL = "mongodb://127.0.0.1:27017/subscribers";

const DATABASE_URL = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listener for database connection errors
db.on('error', (err) => console.log(err));

// Event listener for successful database connection
db.once('open', () => console.log('connected to database'))

// Start the server and listen for incoming requests
app.listen(port, () => console.log(`App listening on port ${port}!`))


