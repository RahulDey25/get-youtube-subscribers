// Importing require modules
const express = require('express');
const path = require("path");
const Subscriber = require('./models/subscribers');
const {cwd} = require('process');

require("dotenv").config(); 
// Importing the mongoose module
const mongoose = require('mongoose');
const app = express();

// Setting the port number
// const port = 3000;
const port = process.env.PORT || 3000;

//Configuring env file

// Middleware to parse JSON bodies and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(cwd(),'public')));


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

// Creating an instance of the express application

// Your code goes here
// Serve static files from the "public" directory
// app.use(express.static("public"));


// Route to serve the "index.html" file
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/index.html"));
// });


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
