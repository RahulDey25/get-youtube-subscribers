// Importing require modules
const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')

//Configuring env file
require("dotenv").config(); 

// Connecting to the MongoDB database
// const DATABASE_URL = "mongodb://localhost/subscribers";

const DATABASE_URL = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Getting the default connection
const db = mongoose.connection

// Event listener for database connection errors
db.on('error', (err) => console.log(err))

// Event listener for successful database connection
db.once('open', () => console.log('Database created...'))

// Function to refresh the database with new data
const refreshAll = async () => {

    // Deletes all existing documents in the "subscribers" collection
    await subscriberModel.deleteMany({})
    // console.log(connection)

    // Inserts new data into the "subscribers" collection
    await subscriberModel.insertMany(data)

    // Disconnects from the database
    await mongoose.disconnect();
}

// Calling the refreshAll function to update the database
refreshAll();