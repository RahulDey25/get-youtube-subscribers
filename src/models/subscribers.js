// Importing mongoose library
const mongoose = require('mongoose');

// Defining a schema for subscribers
const susbcriberSchema = new mongoose.Schema({

    // Name of the subscriber
    name: {
        type: String,
        required: true,
    },

    // Channel to which the subscriber is subscribed
    subscribedChannel:{
        type: String,
        required: true,
    },

    // Date when the subscriber subscribed
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})


// Creating and exporting the Subscriber model based on the schema
module.exports = mongoose.model('Subscriber',susbcriberSchema);