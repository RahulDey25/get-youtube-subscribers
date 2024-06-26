// Importing require modules
const express = require('express');
const path = require("path");
const Subscriber = require('./models/subscribers');
const {cwd} = require('process');

//Configuring env file
require("dotenv").config(); 

// Importing the mongoose module
const mongoose = require('mongoose');
const app = express();

// Setting the port number
const port = process.env.PORT || 3000;


// Middleware to parse JSON bodies and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(cwd(),'public')));


// Get the database URL from the environment variables
const DATABASE_URL = process.env.DATABASE_URI;

// Connect to the MongoDB database using Mongoose
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listener for database connection errors
db.on('error', (err) => console.log(err));

// Event listener for successful database connection
db.once('open', () => console.log('connected to database'))


// Route to get all subscribers
app.get("/subscribers", async (req, res) => {

    try {
        let subscribers = await Subscriber.find();
        res.status(200).send(subscribers);
    } catch (error) {
        // Send 404 status if there's an error
        res.status(404);
    }
});

// Route to get names and subscribed channels of all subscribers
app.get("/subscribers/names", async (req, res) => {

    try {
        let subscribers = await Subscriber.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
        res.status(200).send(subscribers)
    } catch (error) {
        // Send 404 status with an error message if there's an error
        res.status(404).send({ Error_message: "Unnamed Subscriber" })
    }
});

// Route to get a subscriber by ID
app.get("/subscribers/:id", async (req, res) => {
    try {
        let subscribers = await Subscriber.findById(req.params.id);
        res.status(200).send(subscribers);
    } catch (error) {
        // Send 404 status with an error message if there's an error
        res.status(400).send({ Error_message: "Sorry, we couldn't find any subscribers associated with this ID." });
    }
});

// Middleware to handle unmatched routes
app.use((req, res) => {
    // Send 404 status with an error message
    res.status(404).json({ message: "Oops! Page not found" })
});


// Export the Express app
module.exports = app;
